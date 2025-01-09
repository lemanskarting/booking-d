import ModalReview from "@components/ModalReview";
import React, { useRef, useState } from "react";

export default function SectionFour({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalItem = useRef();
  if (typeof isOpen === "number") {
    modalItem.current = data.itemsTwo[isOpen].item;
  }

  return (
    <>
      <section className="py-10 bg-primary-gray md:py-16">
        <div className="page-container-simple">
          <h5 className="pb-5 text-3xl italic font-semibold text-center md:pb-10 md:text-left md:text-5xl">
            {data.headingFour}
          </h5>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
            {data.itemsTwo.map(({ item }, i) => (
              <div
                className={`${
                  i === 1 || i === 2 ? "lg:col-span-7" : "lg:col-span-5"
                } flex space-x-5 bg-white rounded-lg p-5`}
                key={item.name}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full md:h-20 md:w-20"
                />
                <div className="">
                  <p className="text-lg font-semibold md:text-xl">
                    {item.name}
                  </p>
                  <p className="text-sm text-gradient md:text-base !leading-tight max-h-[3.4rem] md:max-h-[3.8rem] text-ellipsis max-w-full overflow-hidden">
                    {item.text}
                  </p>
                  <button
                    onClick={() => setIsOpen(i)}
                    className="mt-2 text-sm italic font-semibold hover:underline focus-visible:underline text-theme-red md:text-base"
                  >
                    {data.reviewButtonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ModalReview isOpen={isOpen !== false} setIsOpen={setIsOpen}>
        <div className={`flex  bg-white rounded-lg p-5 max-w-xl mx-auto`}>
          <img
            src={modalItem.current?.image}
            alt={modalItem.current?.name}
            className="w-16 h-16 mr-5 rounded-full md:h-20 md:w-20"
          />
          <div className="">
            <p className="text-lg font-semibold md:text-xl">
              {modalItem.current?.name}
            </p>
            <p className="text-sm  md:text-base whitespace-pre-line !leading-tight max-w-full overflow-hidden">
              {modalItem.current?.text}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-theme-red-states-simple"
          >
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 41"
              // fill="none"
            >
              <ellipse
                cx="20"
                cy="20.0006"
                rx="20"
                ry="20.0006"
                // fill="currentColor"
              />
              <path
                d="M25.1019 24.686L19.7704 19.356L15.201 14.7879"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M15.0337 24.8413L20.3699 19.5176L24.9433 14.9548"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </ModalReview>
    </>
  );
}
