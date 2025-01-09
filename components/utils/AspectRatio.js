import { forwardRef } from "react";

const AspectRatio = forwardRef((props, forwardedRef) => {
  const {
    ratio = 1 / 1,
    style,
    children,
    className,
    containerClassName,
    ...aspectRatioProps
  } = props;
  return (
    <div className={className} style={{ position: "relative" }}>
      <div
        className={containerClassName}
        style={{
          // ensures inner element is contained
          position: "relative",
          // ensures padding bottom trick maths works
          width: "100%",
          paddingBottom: `${100 / ratio}%`,
          ...style,
        }}
      >
        <div
          {...aspectRatioProps}
          ref={forwardedRef}
          style={{
            // ensures children expand in ratio
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

AspectRatio.displayName = "AspectRatio";

export default AspectRatio;
