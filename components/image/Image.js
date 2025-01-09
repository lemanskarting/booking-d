import { forwardRef } from "react";
import ImageBlur from "./ImageBlur";
import ImageSimple from "./ImageSimple";

const Image = forwardRef(
  (
    {
      src,
      alt = "",
      sizes = "100vw",
      preload,
      className,
      imageClassName,
      loading = "lazy",
      ...props
    },
    forwardedRef
  ) => {
    return src.placeholder ? (
      <>
        <ImageBlur
          alt={alt}
          image={src}
          className={className}
          preload={preload}
          loading={loading}
          sizes={sizes}
          imageClassName={imageClassName}
          ref={forwardedRef}
          {...props}
        />
      </>
    ) : (
      <ImageSimple
        alt={alt}
        src={src}
        preload={preload}
        sizes={sizes}
        className={className}
        loading={loading}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";
export default Image;
