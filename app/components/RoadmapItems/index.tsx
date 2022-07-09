import { useState } from "react";
import GridView from "./GridView";
import ListView from "./ListView";

const RoadmapItems = ({ items }: any) => {
  const [view, setView] = useState("list");
  return (
    <>
      <div>
        <button onClick={() => setView("list")}>List</button>
        <button onClick={() => setView("grid")}>Grid</button>
      </div>
      <div>
        {view === "list" ? (
          <ListView items={items} />
        ) : (
          <GridView items={items} />
        )}
      </div>
    </>
  );
};

export default RoadmapItems;
