import { useState } from "react";
import Filters from "./Filters";
import GridView from "./GridView";
import ListView from "./ListView";

const RoadmapItems = ({ items, filters }: any) => {
  const [view, setView] = useState("list");
  return (
    <div className="sm:w-full md:w-4/5 lg:w-3/5 m-auto">
      <Filters filters={filters} />
      <div>
        <button onClick={() => setView("list")}>List</button>
        <button onClick={() => setView("grid")}>Grid</button>
      </div>
      {view === "list" ? (
        <ListView items={items} />
      ) : (
        <GridView items={items} />
      )}
    </div>
  );
};

export default RoadmapItems;
