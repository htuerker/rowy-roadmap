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
    <div className="navbar bg-inherit px-2 rounded-lg">
      <div className="flex justify-between">
        <ul className="menu menu-horizontal bg-base-200">
          <li>
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
          <li>
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
          <li>
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
          <li>
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
          <li>
            <span onClick={() => handleFilterChange("Launched")}>
              <span
                className={`px-2 ${
                  filter === "Launched" ? "border-b-2 border-b-primary" : " "
                }`}
              >
                Launched
              </span>
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
