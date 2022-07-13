import { ClientOnly } from "remix-utils";
import ViewSwitcher from "../ui/view-switcher";

const RoadmapNavbar = ({
  filter,
  handleFilterChange,
  sortBy,
  handleSortByChange,
  toggleViewMode,
}: any) => {
  return (
    <div className="navbar bg-inherit p-0 pb-1 mb-2">
      <div className="flex justify-between">
        <ul className="menu menu-horizontal bg-base-200">
          <li>
            <span>
              <button
                className={`px-2 ${
                  filter === "All" ? "border-b-2 border-b-primary" : " "
                }`}
                onClick={() => handleFilterChange("All")}
              >
                All
              </button>
            </span>
          </li>
          <li>
            <span>
              <button
                className={`px-2 ${
                  filter === "Pending" ? "border-b-2 border-b-primary" : " "
                }`}
                onClick={() => handleFilterChange("Pending")}
              >
                Pending
              </button>
            </span>
          </li>
          <li>
            <span>
              <button
                className={`px-2 ${
                  filter === "In Progress" ? "border-b-2 border-b-primary" : " "
                }`}
                onClick={() => handleFilterChange("In Progress")}
              >
                In Progress
              </button>
            </span>
          </li>
          <li>
            <span>
              <button
                className={`px-2 ${
                  filter === "Testing" ? "border-b-2 border-b-primary" : " "
                }`}
                onClick={() => handleFilterChange("Testing")}
              >
                Testing
              </button>
            </span>
          </li>
          <li>
            <span>
              <button
                className={`px-2 ${
                  filter === "Launched" ? "border-b-2 border-b-primary" : " "
                }`}
                onClick={() => handleFilterChange("Launched")}
              >
                Launched
              </button>
            </span>
          </li>
        </ul>
      </div>
      <div className="ml-auto">
        <div className="divider divider-horizontal m-0"></div>
        <div className="tooltip tooltip-top" data-tip="Sort by">
          <ul className="menu menu-horizontal bg-base-200">
            <li tabIndex={0}>
              <span>
                <span className="border-b-2 border-b-primary">{sortBy}</span>
              </span>
              <ul className="bg-base-100 z-10">
                <li className={`${sortBy === "Most Recent" ? "bordered" : ""}`}>
                  <button onClick={() => handleSortByChange("Most Recent")}>
                    Most Recent
                  </button>
                </li>
                <li className={`${sortBy === "Most Voted" ? "bordered" : ""}`}>
                  <button onClick={() => handleSortByChange("Most Voted")}>
                    Most Voted
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="divider divider-horizontal m-0"></div>
        <ClientOnly fallback={<></>}>
          {() => <ViewSwitcher toggle={toggleViewMode} />}
        </ClientOnly>
      </div>
    </div>
  );
};

export default RoadmapNavbar;
