import { useFetcher } from "@remix-run/react";
import VoteField from "./vote-field";

const ListItem = ({ item, handleClick }: any) => {
  const fetcher = useFetcher();
  return (
    <div
      onClick={handleClick}
      className="flex w-full overflow-hidden border-b p-1 gap-2 hover:bg-red-50 pointer"
    >
      <fetcher.Form method="post" className="flex flex-col gap-1">
        <VoteField id={item.id} text="👍" />
        <VoteField id={item.id} text="👎" />
        <VoteField id={item.id} text="🔥" />
      </fetcher.Form>
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
