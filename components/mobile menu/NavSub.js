import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { menuItem, itemMenu } from "./Variants";

export default function NavSub({ item, onClick, subLinks, order }) {
  const [isOpen, setIsOpen] = useState(false);

  const controls = useAnimation();

  function toggle() {
    setIsOpen(!isOpen);
    if (!isOpen) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }

  return (
    <motion.div
      variants={menuItem}
      initial="hidden"
      exit="hidden"
      animate="visible"
      custom={order}
      className="w-full py-4"
    >
      <button type="button" onClick={() => toggle()} className="relative z-10">
        {item.title}
        <svg
          className={`inline w-4 h-4 ml-2 transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <motion.div
        variants={itemMenu}
        animate={controls}
        style={{ height: "0" }}
        className="overflow-hidden"
      >
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          className="flex flex-col px-2 mt-2 overflow-hidden rounded-md"
        >
          {subLinks.map((product) => (
            <Link
              href={`/${product.link}`}
              key={product.title}
              role="button"
              onClick={onClick}
              onKeyPress={onClick}
              className="z-10 py-3 text-sm"
              tabIndex="0"
            >
              {product.title}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
