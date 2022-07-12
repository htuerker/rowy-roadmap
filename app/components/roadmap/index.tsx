import { useState } from "react";
import type { RoadmapItem } from "~/models/RoadmapItem";
import Container from "../ui/container";
import GridItem from "./grid-item";
import ItemDialog from "./item-dialog";
import ListItem from "./list-item";

const RoadmapItems = ({
  items,
  viewMode,
}: {
  items: RoadmapItem[];
  viewMode: "list" | "grid";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogItem, setDialogItem] = useState<RoadmapItem | null>(null);

  const handleClick = (itemId: string): any => {
    setIsOpen(true);
    setDialogItem(
      items.find((item: RoadmapItem) => item.id === itemId) || null
    );
  };

  return (
    <Container>
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
    </Container>
  );
};

export default RoadmapItems;
