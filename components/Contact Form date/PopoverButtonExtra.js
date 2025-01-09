import React from "react";
import * as Popover from "@radix-ui/react-popover";

export default function PopoverButtonExtra({
  config,
  children,
  title,
  mainTitle,
  style,
  className,
  setIsPopoverOpen,
  isPopoverOpen,
  disabled,
  ...props
}) {
  return (
    <Popover.Root
      onOpenChange={(isPopoverOpen) => setIsPopoverOpen(isPopoverOpen)}
      open={isPopoverOpen}
    >
      <div
        {...props}
        className={`before:bg-white px-4 !w-full border-squircle ${
          config ? "states-green-squircle" : "states-purple-squircle"
        } ${className} `}
      >
        <Popover.Trigger asChild>
          <button
            disabled={disabled}
            className="!flex disabled:opacity-50 w-full px-4 relative items-center flex-row justify-end h-[4.125rem]"
            aria-label="Update dimensions"
          >
            <span
              className={`${
                !mainTitle ? "text-[#9B9A9E]" : "text-black"
              } !text-base lg:!text-base sm:!text-base !leading-[4.125rem] lg:!leading-[4.125rem] sm:!leading-[4.125rem] absolute  w-auto  left-4 top-0 text-left`}
            >
              {mainTitle || title}
            </span>
            <span className="duration-200 rotate-180 popover-chevron ">
              <Chevron />
            </span>
          </button>
        </Popover.Trigger>
      </div>
      <Popover.Portal style={{ width: "100%" }} className="w-full">
        <Popover.Content
          // side="bottom"
          // avoidCollisions={false}
          style={style}
          className="w-full PopoverContent will-change-[opacity] shadow-xl"
          sideOffset={12}
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
function Chevron() {
  return (
    <svg
      className="w-6 h-6 rotate-180"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
        stroke="#8A8A8E"
        strokeWidth="1.5"
      />
      <path
        d="M7 4V2.5"
        stroke="#8A8A8E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 4V2.5"
        stroke="#8A8A8E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.5 9H21.5"
        stroke="#8A8A8E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
        fill="#8A8A8E"
      />
      <path
        d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
        fill="#8A8A8E"
      />
      <path
        d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
        fill="#8A8A8E"
      />
      <path
        d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
        fill="#8A8A8E"
      />
      <path
        d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
        fill="#8A8A8E"
      />
      <path
        d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
        fill="#8A8A8E"
      />
    </svg>
  );
}
