import React, { useState } from "react";

export default function DiscountInput({ data, handleOnClick, input, num }) {
  const [state, setState] = useState(input * 100);

  return (
    <div
      className={`${
        state === 0 ? "border-primary-gray-medium" : "border-primary-red"
      } flex items-center justify-between p-3 my-5 border-2 lg:px-5 lg:my-8 lg:p-8 rounded-2xl`}
    >
      <p className="uppercase text-xs lg:text-2xl !leading-[1.15] lg:!leading-[1.15] mr-6">
        {data.admin.sale}
      </p>
      <div className="inline-flex lg:text-2xl justify-center items-center border-[0.0625rem] border-primary-gray-medium rounded-md text-sm">
        <button
          className="h-8 px-3 transition-opacity duration-150 hover:opacity-50"
          onClick={() => {
            setState(Math.max(Math.min(parseInt(state - 1), 100), 0));
            handleOnClick(Math.min(state - 1, 100) / 100, num);
          }}
        >
          -
        </button>
        <input
          inputMode="numeric"
          aria-label="Количество"
          className="lg:w-[3.5rem] text-center w-10  h-8 lg:h-10"
          // type="number"
          pattern="[0-9]*%"
          name="number"
          value={state + "%"}
          onBlur={(e) => {
            setState(
              isNaN(parseFloat(e.target.value.slice(0, -1)))
                ? 0
                : Math.max(
                    Math.min(parseInt(e.target.value.slice(0, -1)), 100),
                    0
                  )
            );
            handleOnClick(
              isNaN(parseFloat(e.target.value.slice(0, -1)))
                ? 0
                : Math.max(
                    Math.min(parseFloat(e.target.value.slice(0, -1) / 100), 1),
                    0
                  ),
              num
            );
          }}
          onChange={(e) => {
            setState(
              isNaN(parseFloat(e.target.value.slice(0, -1)))
                ? 0
                : Math.max(
                    Math.min(parseInt(e.target.value.slice(0, -1)), 100),
                    0
                  )
            );
          }}
        />
        <button
          className="h-8 px-3 transition-opacity duration-150 hover:opacity-50"
          onClick={() => {
            setState(Math.max(Math.min(parseInt(state + 1), 100), 0));
            handleOnClick(Math.min(state + 1, 100) / 100, num);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
