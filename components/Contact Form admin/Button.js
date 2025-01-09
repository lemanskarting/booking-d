import React, { forwardRef } from "react";
import Spinner from "./Spinner";

const Button = forwardRef(
  (
    {
      children,
      className,
      spinnerColor = "text-white",
      isLoading = false,
      isDisabled = isLoading,
      ...props
    },
    ref
  ) => {
    const allButtonsStyle =
      "whitespace-no-wrap focus:outline-none relative focus:ring transition-colors duration-200";

    const spinner = <Spinner color={spinnerColor} />;

    const classList = `${className} ${allButtonsStyle} ${
      isDisabled ? "cursor-not-allowed" : ""
    }`;

    return (
      <button ref={ref} className={classList} {...props}>
        {isLoading && spinner}
        <span style={{ visibility: isLoading ? "hidden" : "visible" }}>
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
