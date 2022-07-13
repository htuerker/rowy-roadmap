import { Link } from "@remix-run/react";
import type { RoadmapItem } from "~/models/RoadmapItem";
import IconChevronDown from "../svg/icon-chevron-down";
import IconChevronUp from "../svg/icon-chevron-up";
import IconClipboardList from "../svg/icon-clipboard-list";
import IconFire from "../svg/icon-fire";
import IconMessage from "../svg/icon-message";
import VoteForm from "./vote-form";

const ListItem = ({ item }: { item: RoadmapItem }) => {
  return (
    <div className="flex w-full overflow-hidden border-b p-2 gap-2 pointer hover:bg-base-300 border-none">
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
        <div className="tooltip tooltip-right" data-tip="Downvote">
          <li>
            <label>
              <IconChevronDown />
              <VoteForm id={item.id} vote="Meh" />
            </label>
          </li>
        </div>
      </ul>
      <div className="divider divider-horizontal ml-0"></div>
      <Link to={`/roadmap/${item.id}`} className="w-full">
        <div className="flex flex-col w-full gap-1">
          <div className="flex justify-between">
            <div className="text-xl">{item.feature}</div>
            <div className="flex items-center gap-1">
              {item.createdBy.displayName}
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={item.createdBy.photoURL} alt="Created By" />
                </div>
              </div>
            </div>
          </div>
          <div className="select-none">
            <span className="select-none bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded dark:bg-blue-200 dark:text-blue-800">
              {item.status}
            </span>
          </div>
          <div className="font-light text-sm">{item.description}</div>
        </div>
      </Link>
      <div className="divider divider-horizontal mr-0"></div>
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
            <label>
              <Link to={`/roadmap/${item.id}/comments`} state={item}>
                <IconMessage />
              </Link>
            </label>
          </li>
        </div>
        <div className="tooltip tooltip-left" data-tip="Timelog">
          <li>
            <label>
              <IconClipboardList />
              <VoteForm id={item.id} vote="Meh" />
            </label>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default ListItem;
