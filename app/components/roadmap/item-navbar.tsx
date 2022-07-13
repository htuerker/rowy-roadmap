import { Link } from "react-router-dom";
import type { RoadmapItem } from "~/models/RoadmapItem";
import IconArrowLeft from "../svg/icon-arrow-left";
import StatusBadge from "../ui/status-badge";

const ItemNavbar = ({ item }: { item: RoadmapItem }) => {
  return (
    <div className="navbar rounded-lg bg-base-200">
      <ul className="menu menu-horizontal rounded-box bg-base-200 gap-1 w-full">
        <li className="rounded-l-lg">
          <Link to="/roadmap">
            <IconArrowLeft />
          </Link>
        </li>
        <li>{item.status && <StatusBadge status={item.status} />}</li>
        <li className="text-xl">{item.feature}</li>
        <li className="text-xl ml-auto">Target Release</li>
      </ul>
    </div>
  );
};

export default ItemNavbar;
