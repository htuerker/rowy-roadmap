import type { RoadmapItem } from "~/models/RoadmapItem";
import type { Vote } from "~/models/Vote";

const ItemVotes = ({ item, votes }: { item: RoadmapItem; votes: Vote[] }) => {
  return (
    <div>
      <div className="px-2 pl-6 mb-5">{item.description}</div>
      {votes.length === 0 ? (
        <div>No Votes yet!</div>
      ) : (
        <div className="flex flex-col">
          {votes.map((vote, index) => (
            <div
              key={index}
              className="flex w-full overflow-hidden border-b-2 border-b-base-300 px-2 pl-6 py-4 gap-2 hover:bg-base-300"
            >
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={item.createdBy.photoURL} alt="Created by" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div>{vote.createdBy.name}</div>
                <div>{vote.comment ?? `Voted ${vote.vote}!`}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemVotes;
