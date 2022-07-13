const RoadmapNavbar = ({ activeFilter, handleFilterChange }: any) => {
  return (
    <div className="navbar rounded-lg bg-inherit">
      <ul className="menu menu-horizontal">
        <li className={`${activeFilter === "All" ? "bordered" : ""}`}>
          <button onClick={() => handleFilterChange("All")}>All</button>
        </li>
        <li className={`${activeFilter === "Pending" ? "bordered" : ""}`}>
          <button onClick={() => handleFilterChange("Pending")}>Pending</button>
        </li>
        <li className={`${activeFilter === "In Progress" ? "bordered" : ""}`}>
          <button onClick={() => handleFilterChange("In Progress")}>
            In Progress
          </button>
        </li>
        <li className={`${activeFilter === "Testing" ? "bordered" : ""}`}>
          <button onClick={() => handleFilterChange("Testing")}>Testing</button>
        </li>
        <li className={`${activeFilter === "Launched" ? "bordered" : ""}`}>
          <button onClick={() => handleFilterChange("Launched")}>
            Launched
          </button>
        </li>
      </ul>
    </div>
  );
};

export default RoadmapNavbar;
