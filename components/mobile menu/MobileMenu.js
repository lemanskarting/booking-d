import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import MobileMenuToggle from "./MobileMenuToggle";
import NavLink from "./NavLink";
import { menuScreen } from "./Variants";
import NavExtra from "./NavExtra";

export default function MobileMenu({ data, currentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleNav() {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "initial" : "hidden";
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuScreen}
            key={currentPage}
            initial="hidden"
            exit="hidden"
            animate="visible"
            className="fixed top-0 left-0 w-screen h-screen overflow-y-scroll text-center text-black transform -translate-y-full bg-white"
          >
            <div
              id="menu-items"
              className="z-10 inline-flex flex-col items-center justify-center min-h-full py-12 text-left"
            >
              {data.links.map(({ item }, i) => (
                <NavLink
                  order={i}
                  onClick={() => toggleNav()}
                  item={item}
                  key={item.item.text}
                />
              ))}
              <NavExtra
                order={data.links.length}
                playAnimation={isOpen}
                onClick={() => toggleNav()}
              >
                <div className="inline-grid grid-cols-3 gap-2">
                  <Link href={currentPage} locale="en">
                    <a>En</a>
                  </Link>
                  <Link href={currentPage} locale="ru">
                    <a>Ru</a>
                  </Link>
                </div>
              </NavExtra>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <MobileMenuToggle isOpen={isOpen} onClick={() => toggleNav()} />
      <style global jsx>
        {`
          #menu-items {
            min-width: 12.5rem;
            max-width: 20rem;
            width: 80%;
          }

          #menu-items > *:last-child {
            border-bottom: none;
          }
        `}
      </style>
    </>
  );
}
