import type { RoadmapItem } from "~/models/RoadmapItem";
import type { UserVote } from "~/models/UserVote";
import type { Vote } from "~/models/Vote";
import GridItem from "./grid-item";
import ListItem from "./list-item";

const RoadmapItems = ({
  items,
  userVotes,
}: {
  items: RoadmapItem[];
  userVotes: UserVote[];
}) => {
  const userVoteHash = userVotes.reduce(
    (hash: { [key: string]: Vote }, userVote: UserVote) => {
      hash[userVote.itemId] ||= userVote.vote;
      return hash;
    },
    {}
  );
  return (
    <div className="flex flex-col">
      {items.map((item: any) => (
        <ListItem key={item.id} item={item} vote={userVoteHash[item.id]} />
      ))}
    </div>
  );
};

export default RoadmapItems;
