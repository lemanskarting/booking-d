import MobileMenuToggle from "@components/mobile menu/MobileMenuToggle";
import NavLink from "@components/mobile menu/NavLink";
import { menuScreen } from "@components/mobile menu/Variants";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { forwardRef, useState } from "react";

const Header = forwardRef(function Header({ data }, ref) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleNav() {
    setIsOpen(!isOpen);
    document.querySelector("body").style.overflow = isOpen
      ? "hidden auto"
      : "hidden";
  }

  const router = useRouter();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuScreen}
            initial="hidden"
            exit="hidden"
            animate="visible"
            id="mob-menu"
            className="fixed inset-0 z-40 overflow-y-scroll bg-[#07070DE5] text-center pointer-events-auto text-primary-gray "
          >
            <ul
              id="menu-items"
              className="z-10 inline-flex  flex-col items-center justify-start min-h-full !space-y-0 !pt-28 pb-5 text-left page-container"
            >
              {data.links.map(({ item }, i) => (
                <li key={item.link}>
                  <NavLink
                    order={i}
                    onClick={() => {
                      toggleNav();
                    }}
                    item={item}
                    className="text-center "
                  />
                </li>
              ))}
              <li className="pt-14">
                <a
                  href={data.announcement.button.link}
                  className="theme-button  !leading-[2.25rem] uppercase !text-xs !w-[13.75rem] "
                >
                  <span>{data.announcement.button.title}</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={ref} className="absolute top-0 left-0 z-50 w-full ">
        <div className="bg-[#0e0c17] text-white hidden md:flex">
          <div className="page-container-simple">
            <div className="flex items-start justify-between flex-1 w-full mx-auto ">
              <div className="flex flex-col flex-1 pt-2 text-center lg:items-center lg:flex-row">
                <span className="text-[0.625rem]">
                  {data.announcement.title}
                </span>{" "}
                <a
                  href={`tel:${data.announcement.link}`}
                  className="p-2 text-xs hover:underline hover:text-theme-red focus-visible:underline focus-visible:text-theme-red"
                >
                  {data.announcement.link}
                </a>
              </div>
              <div className="p-2">
                <a
                  href={data.announcement.map.link}
                  className="text-sm hover:underline hover:text-theme-red focus-visible:underline focus-visible:text-theme-red"
                >
                  <i className="font-icons not-italic  before:content-['\e900']"></i>
                  {data.announcement.map.title}
                </a>
              </div>
              <div className="flex justify-end flex-1 my-auto">
                <a
                  href={data.announcement.button.link}
                  className="theme-button  !leading-[2.25rem] uppercase !text-xs !w-auto"
                >
                  <span>{data.announcement.button.title}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <header className="mt-5">
          <div className="page-container font-semibold !py-[0.4375rem] lg:!px-0 !space-y-0 flex lg:justify-center justify-between items-center">
            <a
              // target="_blank"
              href={data.logo.link}
              rel="noreferrer"
              className="font-sans text-sm text-center text-white underline w-[9.375rem] md:w-[5.3125rem] lg:w-[8.75rem]"
            >
              <img
                src={data.logo.image}
                alt="Logo"
                className={`origin-center	mx-auto`}
              />
            </a>
            <ul className="items-center justify-end flex-1 hidden lg:flex">
              {data.links.map(({ item }) => (
                <HeaderLink router={router} key={item.link} item={item} />
              ))}
            </ul>

            <div className="relative z-50 flex lg:hidden">
              <MobileMenuToggle isOpen={isOpen} onClick={() => toggleNav()} />
            </div>
          </div>
        </header>
      </div>
    </>
  );
});

export default Header;

function HeaderLink({ item, router }) {
  return (
    <li className=" skew-x-[-10deg]">
      <a
        target={item.link.includes("http") ? "_blank" : undefined}
        href={item.link}
        rel="noreferrer"
        className={`${
          router.pathname.slice(1) === item.link
            ? "bg-primary-red !opacity-100 rounded-md"
            : ""
        } px-3 inline md:text-base  py-1 text-white duration-200 text-center border-[3px] hover:border-theme-red focus-visible:border-theme-red border-transparent transition-colors`}
      >
        {item.title}
      </a>
    </li>
  );
}
