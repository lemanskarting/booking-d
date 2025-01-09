import { useState } from "react";
import { motion } from "framer-motion";

export default function Collapsible({ children, title, duration }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Раскрыть"
        className={`${
          isOpen ? "" : "rounded-b-lg"
        } sticky rounded-t-lg top-0 z-20 flex bg-[#F7F7F7]  flex-wrap items-center justify-between w-full p-4 md:p-5`}
      >
        <div className="flex items-start justify-between w-full md:w-auto md:block">
          <p className="text-base font-semibold lg:text-xl">{title}</p>
          <div className="flex items-center my-auto group md:hidden">
            <Icon isOpen={isOpen} />
          </div>
        </div>
        <div className="flex items-center">
          <p className="hidden text-sm font-semibold uppercase md:block">
            {isOpen ? "Свернуть" : "развернуть"}
          </p>
          <div className="items-center hidden md:flex group ">
            <Icon isOpen={isOpen} />
          </div>
        </div>
      </button>
      <motion.div
        className="h-0 overflow-hidden rounded-b-lg"
        animate={{
          height: isOpen ? "auto" : 0,
          transition: {
            height: {
              duration: duration,
            },
            ease: [0.165, 0.84, 0.44, 1],
          },
        }}
      >
        <div className="">{children}</div>
      </motion.div>
    </div>
  );
}

function Icon({ isOpen }) {
  return (
    <svg
      className={`${
        isOpen ? "" : "rotate-180"
      } duration-300 group-hover:opacity-70 origin-center  w-4 h-auto ml-[0.625rem]`}
      viewBox="0 0 15 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9766 7.06201L7.54279 2.10163L0.999997 6.81378"
        stroke="#DD2B1C"
        strokeWidth="2"
      />
    </svg>
  );
}
