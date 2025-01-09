import { useStore } from "@components/Store";
import Collapsible from "./Collapsible";
import TableItem from "./TableItem";

export default function CollapsibleBlock({ item }) {
  const { total } = useStore();
  return (
    <Collapsible duration={0.3} title={item.heading}>
      <div className="">
        <div className="w-full text-xs md:text-base">
          {item.items.map((item, i) => (
            <TableItem
              item={
                total.find((itemInTotal) => itemInTotal.id === item.id) || item
              }
              key={i}
            />
          ))}
        </div>
      </div>
    </Collapsible>
  );
}
