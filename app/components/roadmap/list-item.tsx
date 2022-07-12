import type { RoadmapItem } from "~/models/RoadmapItem";
import IconChevronDown from "../svg/icon-chevron-down";
import IconChevronUp from "../svg/icon-chevron-up";
import IconFire from "../svg/icon-fire";
import VoteForm from "./vote-form";

const ListItem = ({
  item,
  handleClick,
}: {
  item: RoadmapItem;
  handleClick: any;
}) => {
  return (
    <div className="flex w-full overflow-hidden border-b p-2 gap-2 pointer hover:bg-base-300 rounded-lg border-none">
      <ul className="menu menu-compact lg:menu-normal bg-inherit p-2 rounded-box gap-1 items-center">
        {/* <div className="tooltip tooltip-right w-full" data-tip="Votes Summary">
          <li>
            <span className="block text-center active cursor-default">55</span>
          </li>
        </div> */}
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
      <div className="flex flex-col w-full">
        <div>
          <div className="text-xl">{item.feature}</div>
          <div>{JSON.stringify(item.createdBy.picture)}</div>
        </div>
        <div className="-mt-1 select-none">
          <span className="select-none bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded dark:bg-blue-200 dark:text-blue-800">
            {item.status}
          </span>
        </div>
        <div className="font-light text-sm">{item.description}</div>
        <div>
          {item.votesSummary.Yes +
            item.votesSummary.Meh +
            item.votesSummary.Urgent}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
