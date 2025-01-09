import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const query = req.query;
  const { fileQuery } = query;

  const filePath = path.join(process.cwd(), "public", fileQuery);
  let file;

  try {
    file = fs.readFileSync(filePath);
  } catch (err) {
    // If the image doesn't exist or the path is otherwise invalid, send a 404 status
    res.status(404).send("Not found");
    return;
  }

  // Get the extension of the image
  const ext = path.extname(filePath);

  // Map the extension to the correct content type
  let contentType;
  switch (ext) {
    case ".ttf":
      contentType = "font/ttf";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
    case ".jpeg":
    case ".JPG":
    case ".JPEG":
      contentType = "image/jpeg";
      break;
    default:
      res.status(400).send("Invalid image type");
      return;
  }

  // Set the headers
  res.setHeader("Content-Type", contentType);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${path.basename(filePath)}`
  );

  // Send the image
  res.send(file);
}
