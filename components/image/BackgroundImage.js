import { forwardRef } from "react";
import ImageBlur from "./ImageBlur";

const BackgroundImage = forwardRef(
  (
    {
      image,
      preload,
      children,
      alt = "",
      className,
      sizes = "100vw",
      containerClassName,
      imageClassName = "object-cover w-full h-full",
      loading = "eager",
      ...props
    },
    forwardedRef
  ) => {
    return (
      <>
        <div className={`relative ${className}`}>
          <div className="absolute inset-0">
            <ImageBlur
              alt={alt}
              image={image}
              className={className}
              preload={preload}
              loading={loading}
              sizes={sizes}
              imageClassName={imageClassName}
              ref={forwardedRef}
              {...props}
            />
          </div>
          <div className={containerClassName}>{children}</div>
        </div>
      </>
    );
  }
);

BackgroundImage.displayName = "BackgroundImage";
export default BackgroundImage;
