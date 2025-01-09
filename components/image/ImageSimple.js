import { ProgressiveImageSupportContext } from "@components/image/ProgressiveImageSupportContext";
import { useContext, useMemo } from "react";
import Preload from "./Preload";

export default function ImageSimple({
  src,
  preload,
  alt = "",
  className,
  sizes = "100vw",
  loading = "lazy",
  ...props
}) {
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
    <>
      <img
        decoding="async"
        sizes={sizes}
        loading={loading}
        className={className}
        alt={alt}
        srcSet={srcSet}
        src={src.src}
        {...props}
      />
      {preload && <Preload src={src} sizes={sizes} />}
    </>
  );
}
