import fs from "fs";
import { join } from "path";
import sharp from "sharp";
import makeDir from "make-dir";
import sizeOf from "image-size";

const CURRENT_WORK_DIR = process.cwd();
const IMAGE_FOLDER = join(CURRENT_WORK_DIR, "public", "images");
const PROCESSED_IMAGE_PATH = join(CURRENT_WORK_DIR, "public", "optimised");

const JPEG_QUALITY = { quality: 75, mozjpeg: true };
const PNG_QUALITY = { quality: 75 };
const WEBP_QUALITY = { quality: 75 };
const AVIF_QUALITY = { quality: 56, chromaSubsampling: "4:2:0" };

const SIZES = [320, 640, 960, 1200, 1440, 2000];

const accessAsync = fs.promises.access;

async function checkFileExists(path) {
  try {
    await accessAsync(path);
    return true;
  } catch {
    return false;
  }
}

const convertImageToBase64 = (image) => {
  return fs.readFileSync(image, "base64");
};

const makeDirectory = async (path) => {
  try {
    await makeDir(path);
  } catch {
    throw new Error("Failed to create directory");
  }
};

async function processImage(image, path, width, quality, format) {
  await makeDirectory(join(PROCESSED_IMAGE_PATH, width.toString()));
  if (!(await checkFileExists(path))) {
    try {
      await sharp(image)
        .resize({ width: width })
        [format === "jpg" ? "jpeg" : format](quality)
        .toFile(path);
    } catch (error) {
      console.error(`${format.toUpperCase()} conversion error:`, error, image);
    }
  }
}

const resizeImage = async (image, dimensions, width) => {
  const path = join(PROCESSED_IMAGE_PATH, `${width}${image}`);
  const img = join(IMAGE_FOLDER, image);
  await processImage(
    img,
    path,
    width,
    dimensions.type === "jpg" ? JPEG_QUALITY : PNG_QUALITY,
    dimensions.type
  );
  return `${PROCESSED_IMAGE_PATH}/${width}${image}`;
};

const convertToAvif = async (image, width) => {
  const path = join(
    PROCESSED_IMAGE_PATH,
    `${width}${image.replace(/\.[^/.]+$/, ".avif")}`
  );
  const img = join(IMAGE_FOLDER, image);
  await processImage(img, path, width, AVIF_QUALITY, "avif");
};

const convertToWebp = async (image, width) => {
  const path = join(
    PROCESSED_IMAGE_PATH,
    `${width}${image.replace(/\.[^/.]+$/, ".webp")}`
  );
  const img = join(IMAGE_FOLDER, image);
  await processImage(img, path, width, WEBP_QUALITY, "webp");
};

const getImageAspectRatio = async (image) => {
  try {
    return await sizeOf(image);
  } catch (error) {
    console.error(
      "Failed to get image dimensions:",
      error,
      join(CURRENT_WORK_DIR + "/public" + image)
    );
    throw new Error("Failed to get image dimensions");
  }
};

const getPlaceholder = async (image, dimensions) => {
  if (dimensions.type === "svg") {
    return convertImageToBase64(join(IMAGE_FOLDER, image));
  }
  const min = await resizeImage(image, dimensions, 40);
  return await convertImageToBase64(min);
};

async function processImageFormats(imageName, dimensions, results, options) {
  const formats = [];
  if (options.avif) {
    await convertImages(imageName, results, convertToAvif);
    formats.push(createImageFormat(imageName, results, "avif"));
  }
  if (options.webp) {
    await convertImages(imageName, results, convertToWebp);
    formats.push(createImageFormat(imageName, results, "webp"));
  }
  formats.push(createImageFormat(imageName, results, dimensions.type));
  return formats;
}

async function convertImages(imageName, results, convertFunc) {
  try {
    await Promise.all(results.map((width) => convertFunc(imageName, width)));
  } catch (error) {
    console.error(`Error during converting images: ${error.message}`);
  }
}

function createImageFormat(imageName, results, format) {
  const srcSet = results
    .map(
      (width) =>
        `${join(
          "/optimised",
          `${width}${
            format === "webp" || format === "avif"
              ? imageName.replace(/.[^/.]+$/, `.${format}`)
              : imageName
          }`
        ).replace(/ /gim, "%20")} ${width}w`
    )
    .join(", ");

  return {
    srcSet,
    format: `image/${format === "jpg" ? "jpeg" : format}`,
  };
}

export async function getFluidImage(
  image,
  options = { avif: false, webp: true }
) {
  if (typeof image !== "string") {
    return image;
  }

  const imageName = image.split("images").pop();
  image = join("public", image);

  try {
    const dimensions = await getImageAspectRatio(image);
    const imageObj = {
      dimensions,
      aspectRatio: (dimensions.width / dimensions.height).toFixed(2),
      placeholder: `data:image/${dimensions.type};base64,${await getPlaceholder(
        imageName,
        dimensions
      )}`,
    };
    let results = SIZES.filter((width) => dimensions.width >= width);
    if (
      !results.includes(dimensions.width) &&
      dimensions.width >= SIZES[0] * 1.2 &&
      dimensions.width <= SIZES.slice(-1)
    ) {
      results.push(dimensions.width);
    }

    if (dimensions.type !== "svg") {
      await Promise.all(
        results.map((width) => resizeImage(imageName, dimensions, width))
      );
      imageObj.formats = await processImageFormats(
        imageName,
        dimensions,
        results,
        options
      );
    }

    imageObj.src =
      dimensions.width >= 2000
        ? join("/optimised", `${2000}${imageName}`)
        : join("/images", imageName);

    return imageObj;
  } catch (error) {
    console.error(`Error during processing image: ${error.message}`);
  }
}
