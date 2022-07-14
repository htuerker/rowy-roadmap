import type { RoadmapItem } from "~/models/RoadmapItem";
import type { UserVote } from "~/models/UserVote";
import { Vote } from "~/models/Vote";
import GridItem from "./grid-item";
import ListItem from "./list-item";

const RoadmapItems = ({
  items,
  userVotes,
  viewMode,
}: {
  items: RoadmapItem[];
  userVotes: UserVote[];
  viewMode: "list" | "grid";
}) => {
  const userVoteHash = userVotes.reduce(
    (hash: { [key: string]: Vote }, userVote: UserVote) => {
      hash[userVote.itemId] ||= userVote.vote;
      return hash;
    },
    {}
  );
  return (
    <>
      {viewMode === "list" && (
        <div className="flex flex-col">
          {items.map((item: any) => (
            <>
              <ListItem
                key={item.id}
                item={item}
                vote={userVoteHash[item.id]}
              />
            </>
          ))}
        </div>
      )}
      {viewMode === "grid" && (
        <div className="flex flex-wrap justify-start gap-1">
          {items.map((item: any) => (
            <GridItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default RoadmapItems;
