import styles from "./index.module.css";
import React, { forwardRef } from "react";

const Spinner = (
  { color = "border-gray-900", size = "lg", loadingText, className, ...props },
  ref
) => {
  const SIZES = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
    custom: "",
  };

  return (
    <div
      className={` ${SIZES[size]} absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}
    >
      <div
        className={`${styles["spin-container"]} inline-block ${
          loadingText ? "relative" : "absolute"
        } border-2 !border-white inset-0 rounded-full ${color} ${
          SIZES[size]
        } ${className}`}
        ref={ref}
        {...props}
      >
        <div className="absolute p-0 overflow-hidden whitespace-no-wrap border-0 spin"></div>
      </div>
    </div>
  );
};

export default forwardRef(Spinner);
