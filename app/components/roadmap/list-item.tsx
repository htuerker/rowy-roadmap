import { Link } from "@remix-run/react";
import type { RoadmapItem } from "~/models/RoadmapItem";
import type { Vote } from "~/models/Vote";
import IconClipboardList from "../svg/icon-clipboard-list";
import IconMessage from "../svg/icon-message";
import StatusBadge from "../ui/status-badge";
import ListItemVoteField from "./list-item-vote-field";

const ListItem = ({ item, vote }: { item: RoadmapItem; vote?: Vote }) => {
  const score =
    item.votesSummary.Yes -
    item.votesSummary.Meh +
    2 * item.votesSummary.Urgent;
  return (
    <div className="w-full overflow-hidden border-b-2 border-b-base-200 px-2 py-4 hover:bg-base-200 gap-1 md:gap-2 flex flex-col md:flex-row ">
      <ListItemVoteField item={item} vote={vote} />
      <div className="divider divider-horizontal m-0"></div>
      <div className="flex flex-col w-full">
        <div className="text-xl leading-9">
          <div className="inline-flex">
            {item.status && <StatusBadge status={item.status} />}
          </div>
          <div className="inline-flex">{item.feature}</div>
        </div>
        <div className="font-light text-sm">{item.description}</div>
      </div>

      <div className="divider divider-horizontal m-0"></div>
      <ul className="menu menu-compact bg-inherit rounded-box gap-1 items-center p-0 flex-row md:flex-col justify-between">
        <div
          className="tooltip tooltip-right md:tooltip-left"
          data-tip="Votes Summary"
        >
          <li className="disabled">
            <span
              className="block disabled text-center cursor-default w-14 h-10 color-black"
              style={{ color: "inherit" }}
            >
              {score !== 0 && score > 0 && "+"}
              {score}
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
            <Link to={`/roadmap/${item.id}/timelog`} state={item}>
              <IconClipboardList />
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default ListItem;
