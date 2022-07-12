import type { RoadmapItem } from "~/models/RoadmapItem";
import VoteForm from "./vote-form";

const ListItem = ({
  item,
  handleClick,
}: {
  item: RoadmapItem;
  handleClick: any;
}) => {
  return (
    <div
      onClick={handleClick}
      className="flex w-full overflow-hidden border-b p-1 gap-2 hover:bg-red-50 pointer"
    >
      <VoteForm id={item.id} vote="Yes" text="👍" />
      <VoteForm id={item.id} vote="Meh" text="👎" />
      <VoteForm id={item.id} vote="Urgent" text="🔥" />
      <div className="flex flex-col w-full">
        <div className="font-medium text-stone">{item.feature}</div>
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
