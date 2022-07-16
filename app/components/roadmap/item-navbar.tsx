import { Link } from "react-router-dom";
import type { RoadmapItem } from "~/models/RoadmapItem";
import { IconArrowLeft } from "../svg/index";
import StatusBadge from "../ui/status-badge";

const ItemNavbar = ({ item }: { item: RoadmapItem }) => {
  return (
    <div className="navbar rounded-lg border-b-2 border-b-base-200 rounded-b-none pb-0">
      <ul className="menu menu-horizontal rounded-box gap-1 w-full">
        <li className="rounded-l-lg">
          <Link to="/roadmap">
            <IconArrowLeft />
          </Link>
        </li>
        <div className="ml-auto">
          {item.status && <StatusBadge status={item.status} />}
        </div>
      </ul>
    </div>
  );
};

export default ItemNavbar;
