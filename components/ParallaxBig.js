import { useRef, useEffect } from "react";
import { useInViewScroll } from "./utils/useInViewScroll";

export default function ParallaxBig({ data }) {
  const ref = useRef(null);

  const progress = useInViewScroll(ref);
  const prev = useRef(0);
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  useEffect(() => {
    let currentBaseX = 1;

    function updateAnimations() {
      let progressValue = progress.get();
      let diff = prev.current + (progressValue - prev.current) * 0.05;
      currentBaseX = clamp((diff - 0.5) * -1, -1, 1);

      // Update CSS Variables
      // -0.5 - 0.5
      ref.current?.style.setProperty("--baseX", currentBaseX.toFixed(3));

      prev.current = diff;
      requestAnimationFrame(updateAnimations);
    }

    const animationFrameId = requestAnimationFrame(updateAnimations);

    return () => cancelAnimationFrame(animationFrameId);
  }, [progress]);

  return (
    <div
      className="pointer-events-none"
      ref={ref}
      style={{
        "--y": "calc((var(--baseX) * 40px))",
        "--y2": "calc(var(--baseX) * 170px)",
        "--y3": "calc(var(--baseX) * 120px)",
        "--y4": "calc(var(--baseX) * 100px)",
        "--y5": "calc(var(--baseX) * 60px)",
        "--y6": "calc(var(--baseX) * 40px)",
      }}
    >
      <div className="absolute  w-full h-[100%] bottom-0 left-0">
        <img
          style={{ transform: "translateY(var(--y))" }}
          src={data.baloons.desktopBig}
          alt="шарик"
          className="object-cover object-top w-full h-[calc(100%_+_40px)] sm:block hidden"
        />
        <img
          style={{ transform: "translateY(var(--y))" }}
          src={data.baloons.mobileBig}
          alt="шарик"
          className="object-cover object-top h-[calc(100%_+_40px)] w-full sm:hidden"
        />
      </div>
      <div className="absolute w-full bottom-0 overflow-hidden h-[140%]">
        <img
          style={{ transform: "translateY(var(--y2))" }}
          src={data.baloons.desktopSmall}
          alt=""
          className="bottom-[13vw] left-[8vw] w-[19vw] lg:w-[15.25rem] will-change-transform absolute z-[-1] sm:block hidden"
        />
        <img
          style={{ transform: "translateY(var(--y3))" }}
          src={data.baloons.desktopSmall}
          alt=""
          className="bottom-[12vw] right-[-4vw] w-[16vw] lg:w-[14.25rem] will-change-transform z-[-1] absolute sm:block hidden"
        />
        <img
          style={{ transform: "translateY(var(--y4))" }}
          src={data.baloons.desktopSmall}
          alt=""
          className="bottom-[-10vw] left-[33vw] w-[19vw] will-change-transform absolute sm:block hidden"
        />
        <img
          style={{ transform: "translateY(var(--y4))" }}
          src={data.baloons.desktopSmall}
          alt=""
          className="bottom-[-18vw] left-[63vw] w-[19vw] will-change-transform absolute sm:block hidden"
        />
        {/* Mobile */}
        <img
          style={{ transform: "translateY(var(--y3))" }}
          src={data.baloons.desktopSmall}
          alt=""
          className="bottom-[35%] z-[-1] right-[-10vw] w-[50vw] will-change-transform absolute sm:hidden"
        />
        <img
          style={{ transform: "translateY(var(--y5))" }}
          src={data.baloons.mobileSmallOne}
          alt=""
          className="left-0 bottom-[-60px] w-[100vw] z-10 will-change-transform absolute sm:hidden"
        />
      </div>
    </div>
  );
}
