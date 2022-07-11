import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import GridItem from "./grid-item";
import ItemDialog from "./item-dialog";
import ListItem from "./list-item";

const RoadmapItems = ({ items }: any) => {
  const fetcher = useFetcher();
  const [viewMode, setViewMode] = useState("list");
  const [isOpen, setIsOpen] = useState(false);
  const [dialogItem, setDialogItem] = useState(null);

  const handleClick = (itemId: string) => {
    setIsOpen(true);
    setDialogItem(items.find((item: any) => item.id === itemId));
  };

  const handleVote = (itemId: string, vote: any) => {
    fetcher.submit(
      { vote },
      { action: `/roadmap/${itemId}/votes`, method: "post" }
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
              handleVote={handleVote}
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
