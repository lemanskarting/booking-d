import { forwardRef, useCallback, useEffect, useRef } from "react";
import styles from "./index.module.css";
import Preload from "./Preload";

const ImageBlur = forwardRef(
  (
    {
      image,
      preload,
      alt = "",
      sizes = "100vw",
      className,
      imageClassName = "object-cover w-full h-full",
      loading = "lazy",
      ...props
    },
    forwardedRef
  ) => {
    const imageRef = useRef();
    const wasLoaded = useRef(false);

    const sources = image.formats.map((format, i) => (
      <source
        sizes={sizes}
        key={i}
        srcSet={format.srcSet}
        type={`${format.format}`}
      />
    ));

    // See https://stackoverflow.com/q/39777833/266535 for why we use this ref
    // handler instead of the img's onLoad attribute.
    function handleLoading(img) {
      if (!img) {
        return;
      }

      checkImageCachedEvent(img);

      const p = "decode" in img ? img.decode() : Promise.resolve();
      p.catch(() => {}).then(() => {
        if (!img.parentElement || !img.isConnected) {
          // Exit early in case of race condition:
          // - onload() is called
          // - decode() is called but incomplete
          // - unmount is called
          // - decode() completes
          return;
        }
        setBlurComplete();
      });
    }

    function setBlurComplete() {
      const imagePlaceholder = imageRef.current.getElementsByClassName(
        styles.responsiveImage
      )[0];
      imagePlaceholder.classList.add(styles.loaded);
    }

    function checkImageCached() {
      const imagePlaceholder = imageRef.current.getElementsByClassName(
        styles.responsiveImage
      )[0];
      const imageEl = imageRef.current.getElementsByClassName("onload")[0];

      if (imageEl.complete && wasLoaded.current === false) {
        wasLoaded.current = true;
        imagePlaceholder.classList.add(styles.wasLoaded);
      }
    }

    function checkImageCachedEvent(target) {
      const imagePlaceholder =
        target.parentElement.parentElement.children[0].children[0];
      const imageEl = target;
      const resources = performance.getEntriesByType("resource");
      const imgResources = resources.filter(
        (resource) => resource.name === imageEl.currentSrc
      );

      if (
        imgResources.length > 0 &&
        (imgResources[0].decodedBodySize === 0 ||
          imgResources[0].duration <= 70 ||
          imgResources[0].transferSize <= 1000) &&
        wasLoaded.current === false
      ) {
        wasLoaded.current = true;
        imagePlaceholder.classList.add(styles.wasLoaded);
      }
    }

    useEffect(() => {
      checkImageCached();
    }, []);

    return (
      <>
        <div ref={imageRef} className={`relative ${className}`}>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div
              style={{
                backgroundImage: `url("${image.placeholder}")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className={`relative pointer-events-none ease-in-out w-full h-full ${styles.responsivePlaceholder} ${styles.responsiveImage}`}
            />
          </div>
          <picture
            {...props}
            className={`relative top-0 left-0 w-full h-full pointer-events-none  no-select`}
          >
            {sources}

            <img
              decoding="async"
              loading={loading}
              className={`${imageClassName} onload`}
              alt={alt}
              ref={useCallback(
                (img) => {
                  if (forwardedRef) {
                    if (typeof forwardedRef === "function") forwardedRef(img);
                    else if (typeof forwardedRef === "object") {
                      forwardedRef.current = img;
                    }
                  }
                  if (!img) {
                    return;
                  }
                  if (img.complete) {
                    handleLoading(img);
                  }
                },
                // eslint-disable-next-line react-hooks/exhaustive-deps
                [forwardedRef]
              )}
              onLoad={(event) => handleLoading(event.currentTarget)}
              src={image.src}
            />
          </picture>
        </div>
        {preload && <Preload src={image} sizes={sizes} />}
      </>
    );
  }
);

ImageBlur.displayName = "ImageBlur";
export default ImageBlur;
