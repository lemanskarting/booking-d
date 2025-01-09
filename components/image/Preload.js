import { ProgressiveImageSupportContext } from "@components/image/ProgressiveImageSupportContext";
import Head from "next/head";
import { useMemo, useContext } from "react";

export default function Preload({ src, sizes = "100vw" }) {
  const { ProgressiveImageSupport } = useContext(
    ProgressiveImageSupportContext
  );

  let srcSet = useMemo(() => {
    if (!src.formats || src.formats.length === 0) {
      return undefined;
    }

    const avifSrcSet = src.formats.find(
      (item) => item.format === "image/avif"
    )?.srcSet;
    const webpSrcSet = src.formats.find(
      (item) => item.format === "image/webp"
    )?.srcSet;
    const oldSrcSet = src.formats.find(
      (item) => item.format !== "image/avif" && item.format !== "image/webp"
    )?.srcSet;

    if (ProgressiveImageSupport.avif && avifSrcSet) {
      return avifSrcSet;
    } else if (ProgressiveImageSupport.webp && webpSrcSet) {
      return webpSrcSet;
    } else {
      return oldSrcSet;
    }
  }, [ProgressiveImageSupport, src]);

  return (
    <Head>
      <link
        key={JSON.stringify(src)}
        as="image"
        rel="preload"
        imageSrcSet={srcSet}
        href={srcSet ? undefined : src.src}
        imageSizes={sizes}
      />
    </Head>
  );
}
