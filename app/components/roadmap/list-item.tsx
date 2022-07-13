import { Link } from "@remix-run/react";
import type { RoadmapItem } from "~/models/RoadmapItem";
import IconChevronDown from "../svg/icon-chevron-down";
import IconChevronUp from "../svg/icon-chevron-up";
import IconClipboardList from "../svg/icon-clipboard-list";
import IconFire from "../svg/icon-fire";
import IconMessage from "../svg/icon-message";
import StatusBadge from "../ui/status-badge";
import VoteForm from "./vote-form";

const ListItem = ({ item }: { item: RoadmapItem }) => {
  return (
    <div className="flex w-full overflow-hidden border-b-2 border-b-base-300 p-2 gap-2 hover:bg-base-300">
      <ul className="menu menu-compact bg-inherit rounded-box gap-1 items-center p-0">
        <div className="tooltip tooltip-right" data-tip="Urgent">
          <li>
            <label>
              <IconFire />
              <VoteForm id={item.id} vote="Urgent" />
            </label>
          </li>
        </div>
        <div className="tooltip tooltip-right" data-tip="Upvote">
          <li>
            <label>
              <IconChevronUp />
              <VoteForm id={item.id} vote="Yes" />
            </label>
          </li>
        </div>
        <div className="tooltip tooltip-right z-10" data-tip="Downvote">
          <li>
            <label>
              <IconChevronDown />
              <VoteForm id={item.id} vote="Meh" />
            </label>
          </li>
        </div>
      </ul>
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
            <Link to={`/roadmap/${item.id}/comments`} state={item}>
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
