import { memo, useEffect, useState } from "react";
import { useStore } from "../Store";
import AmountInput from "./AmountInput";
import { formatRub } from "../../lib/helperFunctions";
import ImageSimple from "@components/image/ImageSimple";
import AspectRatio from "@components/utils/AspectRatio";
import PhotoPopUp from "./PhotoPopUp";
import { useIsMd } from "@components/utils/useMediaQuery";

const TableItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  const { changeAmount } = useStore();

  const [input, setInput] = useState(0);
  const handleOnClick = (newAmount) => {
    if (item.max) {
      setInput(Math.min(newAmount, item.max));
      changeAmount(item.id, Math.min(newAmount, item.max));
    } else {
      setInput(newAmount);
      changeAmount(item.id, newAmount);
    }
  };
  const handleInputChange = (e) => {
    setInput(parseInt(e) || 0);
  };

  const handleBlur = () => {
    handleOnClick(parseInt(input) || 0);
  };

  useEffect(() => {
    setInput(item.amount);
  }, [item.amount]);

  const isMd = useIsMd();

  return (
    <div className="bg-[#F7F7F7] relative border-t flex flex-wrap py-3 md:py-4 items-center md:items-start border-[#C6C5CB] text-sm">
      {item.imageFluid && (
        <>
          <button
            aria-label="увеличить фото"
            onClick={() => setOpen(true)}
            className="rounded-[0.25rem] md:rounded-sm table-item-width-image"
          >
            <AspectRatio ratio={isMd ? 2.27 : 3.75}>
              <ImageSimple
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 240px"
                src={item.imageFluid}
                alt={item.heading}
                className="object-cover w-full h-full rounded-[0.25rem] md:rounded-sm"
                loading="lazy"
              />
              <ZoomIcon />
            </AspectRatio>
          </button>
        </>
      )}
      {item.imageFluid && (
        <PhotoPopUp
          open={open}
          src={item.imageFluid}
          onClick={() => setOpen(false)}
        />
      )}
      <p
        className={`pb-3 table-item-width-0 ${
          item.imageFluid ? "with-image" : ""
        } md:pb-0`}
      >
        {item.heading}
      </p>
      <p className="table-item-width-1">{item.text}</p>
      <p className="table-item-width-2 ">
        <span className="font-medium">{formatRub(item.price)}</span>
        <span className="block md:hidden text-[#08070E99]">{item.text}</span>
      </p>
      <div className="table-item-width-3">
        <AmountInput
          className="!w-40 md:!w-24"
          handleOnClick={handleOnClick}
          handleInputChange={handleInputChange}
          input={input}
          handleBlur={handleBlur}
        />
      </div>
    </div>
  );
};
export default memo(TableItem);
function ZoomIcon() {
  return (
    <svg
      className="w-6 h-6 m-[0.625rem] absolute top-0 right-0 duration-200 group-hover:opacity-60"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5 18.5L22 22"
        stroke="white"
        strokeWidth="1.4375"
        strokeLinecap="round"
      />
      <path
        d="M9 11.5H11.5M11.5 11.5H14M11.5 11.5V14M11.5 11.5V9"
        stroke="white"
        strokeWidth="1.4375"
        strokeLinecap="round"
      />
      <path
        d="M6.75 3.27093C8.14732 2.46262 9.76964 2 11.5 2C16.7467 2 21 6.25329 21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5C2 9.76964 2.46262 8.14732 3.27093 6.75"
        stroke="white"
        strokeWidth="1.4375"
        strokeLinecap="round"
      />
    </svg>
  );
}
