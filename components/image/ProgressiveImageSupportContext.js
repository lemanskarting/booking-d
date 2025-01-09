import { createContext, useEffect, useState } from "react";

export const ProgressiveImageSupportContext = createContext({
  ProgressiveImageSupport: { webp: true, avif: true },
  setProgressiveImageSupport: () => {},
});

export function ProgressiveImageSupportProvider(props) {
  useEffect(() => {
    async function checkWebpSupport(feature) {
      return new Promise((resolve) => {
        const kTestImages = {
          lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
          lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
          alpha:
            "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
          animation:
            "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
        };
        const img = new Image();
        img.onload = function () {
          const result = img.width > 0 && img.height > 0;
          resolve(result);
        };
        img.onerror = function () {
          resolve(false);
        };
        img.src = "data:image/webp;base64," + kTestImages[feature];
      });
    }
    async function checkAvifSupport() {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = function () {
          const result = img.width > 0 && img.height > 0;
          resolve(result);
        };
        img.onerror = function () {
          resolve(false);
        };
        img.src =
          "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
      });
    }

    async function checkImageFormatSupport() {
      const webp = new Image();
      webp.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

      const avif = new Image();
      avif.src = "";

      const webpSupport =
        (await checkWebpSupport("alpha")) &&
        (await checkWebpSupport("lossy")) &&
        (await checkWebpSupport("lossless"));
      const avifSupport = await checkAvifSupport();

      setProgressiveImageSupport({ webp: webpSupport, avif: avifSupport });
    }
    checkImageFormatSupport();
  }, []);

  const [ProgressiveImageSupport, setProgressiveImageSupport] = useState({
    webp: true,
    avif: true,
  });

  return (
    <ProgressiveImageSupportContext.Provider
      value={{ ProgressiveImageSupport, setProgressiveImageSupport }}
    >
      {props.children}
    </ProgressiveImageSupportContext.Provider>
  );
}
