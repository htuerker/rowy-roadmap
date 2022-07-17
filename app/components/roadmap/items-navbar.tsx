const ItemsNavbar = ({
  filter,
  handleFilterChange,
  sortBy,
  handleSortByChange,
}: any) => {
  return (
    <div className="navbar bg-inherit px-2 pb-0 border-b-2 border-b-base-200 rounded-b-none md:rounded-lg md:rounded-b-none">
      <div className="flex">
        <ul className="menu menu-horizontal">
          <li tabIndex={0} className="md:hidden">
            <span>
              <span className="border-b-2 border-b-primary">{filter}</span>
            </span>
            <ul className="bg-base-200 menu-compact z-10 shadow-xl">
              <li
                className={`${
                  filter === "All" ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <button onClick={() => handleFilterChange("All")}>All</button>
              </li>
              <li
                className={`${
                  filter === "Pending" ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <button onClick={() => handleFilterChange("Pending")}>
                  Pending
                </button>
              </li>
              <li
                className={`${
                  filter === "In Progress" ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <button onClick={() => handleFilterChange("In Progress")}>
                  In Progress
                </button>
              </li>
              <li
                className={`${
                  filter === "Testing" ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <button onClick={() => handleFilterChange("Testing")}>
                  Testing
                </button>
              </li>
              <li
                className={`${
                  filter === "Completed" ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <button onClick={() => handleFilterChange("Complete")}>
                  Complete
                </button>
              </li>
            </ul>
          </li>
          <li className="hidden md:inline-block rounded-lg">
            <span onClick={() => handleFilterChange("All")}>
              <span
                className={`px-2 ${
                  filter === "All" ? "border-b-2 border-b-primary" : " "
                }`}
              >
                All
              </span>
            </span>
          </li>
          <li className="hidden md:inline-block">
            <span onClick={() => handleFilterChange("Pending")}>
              <span
                className={`px-2 ${
                  filter === "Pending" ? `border-b-2 border-b-primary` : " "
                }`}
              >
                Pending
              </span>
            </span>
          </li>
          <li className="hidden md:inline-block">
            <span onClick={() => handleFilterChange("In Progress")}>
              <span
                className={`px-2 ${
                  filter === "In Progress" ? "border-b-2 border-b-primary" : " "
                }`}
              >
                In Progress
              </span>
            </span>
          </li>
          <li className="hidden md:inline-block">
            <span onClick={() => handleFilterChange("Testing")}>
              <span
                className={`px-2 ${
                  filter === "Testing" ? "border-b-2 border-b-primary" : " "
                }`}
              >
                Testing
              </span>
            </span>
          </li>
          <li className="hidden md:inline-block">
            <span onClick={() => handleFilterChange("Complete")}>
              <span
                className={`px-2 ${
                  filter === "Launched" ? "border-b-2 border-b-primary" : " "
                }`}
              >
                Complete
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div className="ml-auto">
        <div className="tooltip tooltip-top" data-tip="Sort by">
          <ul className="menu menu-horizontal">
            <li tabIndex={0}>
              <span>
                <span className="border-b-2 border-b-primary">{sortBy}</span>
              </span>
              <ul className="bg-base-200 menu-compact z-10 shadow-xl">
                <li
                  className={`${
                    sortBy === "Most Recent"
                      ? "border-l-4 border-l-primary"
                      : ""
                  }`}
                >
                  <button onClick={() => handleSortByChange("Most Recent")}>
                    Most Recent
                  </button>
                </li>
                <li
                  className={`${
                    sortBy === "Most Voted" ? "border-l-4 border-l-primary" : ""
                  }`}
                >
                  <button onClick={() => handleSortByChange("Most Voted")}>
                    Most Voted
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemsNavbar;
