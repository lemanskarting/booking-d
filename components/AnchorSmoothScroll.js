import { useEffect } from "react";

export default function AnchorSmoothScroll({ children }) {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.classList.remove("!text-white");
        });

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }, []);
  return <>{children}</>;
}
