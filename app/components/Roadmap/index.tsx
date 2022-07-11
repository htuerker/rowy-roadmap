import { useState } from "react";
import type { RoadmapItem } from "~/models/RoadmapItem";
import GridItem from "./grid-item";
import ItemDialog from "./item-dialog";
import ListItem from "./list-item";

const RoadmapItems = ({ items }: { items: RoadmapItem[] }) => {
  const [viewMode, setViewMode] = useState("list");
  const [isOpen, setIsOpen] = useState(false);
  const [dialogItem, setDialogItem] = useState<RoadmapItem | null>(null);

  const handleClick = (itemId: string): any => {
    setIsOpen(true);
    setDialogItem(
      items.find((item: RoadmapItem) => item.id === itemId) || null
    );
  };

  return (
    <div className="max-w-screen-md md:mx-auto shadow-md mt-5">
      <div className="flex py-2 gap-2 w-full justify-center">
        <button
          onClick={() => setViewMode("list")}
          className={`px-2 py-1 ${viewMode === "list" ? "bg-red-200" : " "}`}
        >
          List
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={`px-2 py-1 ${viewMode === "grid" ? "bg-red-200" : " "}`}
        >
          Grid
        </button>
      </div>
      {viewMode === "list" && (
        <div className="flex flex-col mt-5">
          {items.map((item: any) => (
            <ListItem
              key={item.id}
              item={item}
              handleClick={() => handleClick(item.id)}
            />
          ))}
        </div>
      )}
      {viewMode === "grid" && (
        <div className="flex mt-5 flex-wrap justify-start">
          {items.map((item: any) => (
            <GridItem key={item.id} item={item} />
          ))}
        </div>
      )}
      <ItemDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        item={dialogItem}
      />
    </div>
  );
};

export default RoadmapItems;
