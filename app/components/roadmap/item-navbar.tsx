import { Link } from "react-router-dom";
import type { RoadmapItem } from "~/models/RoadmapItem";

const ItemNavbar = ({ item }: { item: RoadmapItem }) => {
  return (
    <div className="navbar rounded-lg bg-base-200 shadow-lg">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/roadmap">Roadmap</Link>
          </li>
          <li>
            <Link to={`/roadmap/${item.id}`}>{item.feature}</Link>
          </li>
          <li>Comments</li>
        </ul>
      </div>
    </div>
  );
};

export default ItemNavbar;
