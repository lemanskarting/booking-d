import * as Select from "@radix-ui/react-select";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { forwardRef } from "react";

const SelectTime = ({ value, onValueChange, values }) => (
  <Select.Root onValueChange={onValueChange} value={value}>
    <Select.Trigger
      className="inline-flex items-center text-sm justify-between px-2 w-[4.375rem]  leading-none h-7 bg-[#F7F7F7] "
      aria-label="выбор времени"
    >
      <Select.Value placeholder="--:--" />
      <Select.Icon>
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden bg-[#F7F7F7] rounded-md">
        <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-[#F7F7F7] cursor-default ">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-2">
          <Select.Group>
            <SelectItem value={"--:--"}>{"--:--"}</SelectItem>
            {values.map((item) => (
              <SelectItem key={item.start} value={item.start}>
                {item.start}
              </SelectItem>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-[#F7F7F7] cursor-default">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={`text-sm leading-none flex items-center h-6 px-6 relative select-none data-[disabled]:pointer-events-none cursor-pointer data-[highlighted]:outline-none data-[highlighted]:bg-primary-gray ${className}`}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex items-center justify-center w-6">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";
export default SelectTime;
