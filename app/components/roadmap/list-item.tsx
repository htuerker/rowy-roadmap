import { Link } from "@remix-run/react";
import type { RoadmapItem } from "~/models/RoadmapItem";
import type { Vote } from "~/models/Vote";
import IconClipboardList from "../svg/icon-clipboard-list";
import IconMessage from "../svg/icon-message";
import StatusBadge from "../ui/status-badge";
import ListItemVoteField from "./list-item-vote-field";

const ListItem = ({ item, vote }: { item: RoadmapItem; vote?: Vote }) => {
  return (
    <div className="flex w-full overflow-hidden border-b-2 border-b-base-300 p-2 gap-2 hover:bg-base-300">
      <ListItemVoteField item={item} vote={vote} />
      <div className="divider divider-horizontal m-0"></div>
      <div className="flex flex-col w-full gap-1">
        <div className="flex items-center mb-1 h-9">
          {item.status && <StatusBadge status={item.status} />}
          <div className="text-xl leading-9">{item.feature}</div>
        </div>
        <div className="font-light text-sm">{item.description}</div>
      </div>

      <div className="divider divider-horizontal m-0"></div>
      <ul className="menu menu-compact bg-inherit rounded-box gap-1 items-center p-0">
        <div className="tooltip tooltip-left w-full" data-tip="Votes Summary">
          <li>
            <span className="block text-center active cursor-default">
              {item.votesSummary.Yes +
                item.votesSummary.Meh +
                item.votesSummary.Urgent}
            </span>
          </li>
        </div>
        <div className="tooltip tooltip-left" data-tip="Comments">
          <li>
            <Link to={`/roadmap/${item.id}/votes`} state={item}>
              <IconMessage />
            </Link>
          </li>
        </div>
        <div className="tooltip tooltip-left" data-tip="Timelog">
          <li>
            <label>
              <IconClipboardList />
            </label>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default ListItem;
