import type { RoadmapItem } from "~/models/RoadmapItem";
import GridItem from "./grid-item";
import ListItem from "./list-item";

const RoadmapItems = ({
  items,
  viewMode,
}: {
  items: RoadmapItem[];
  viewMode: "list" | "grid";
}) => {
  return (
    <>
      {viewMode === "list" && (
        <div className="flex flex-col">
          {items.map((item: any) => (
            <>
              <ListItem key={item.id} item={item} />
            </>
          ))}
        </div>
      )}
      {viewMode === "grid" && (
        <div className="flex flex-wrap justify-start gap-1">
          {items.map((item: any) => (
            <GridItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default RoadmapItems;
