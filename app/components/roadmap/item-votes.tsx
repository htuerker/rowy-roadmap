import type { RoadmapItem } from "~/models/RoadmapItem";
import type { Vote } from "~/models/Vote";

const ItemVotes = ({ item, votes }: { item: RoadmapItem; votes: Vote[] }) => {
  return (
    <div className="mt-5">
      <div className="px-1 md:px-2 md:pl-6 text-xl">
        <div className="inline-flex"></div>
        <div className="text-xl inline-flex leading-9">{item.feature}</div>
        <div className="mb-5 text-sm">{item.description}</div>
      </div>
      {votes.length === 0 ? (
        <div>No Votes yet!</div>
      ) : (
        <div className="flex flex-col">
          {votes.map((vote, index) => (
            <div
              key={index}
              className="px-1 md:px-2 md:pl-6 flex w-full overflow-hidden border-b-2 border-b-base-300 py-4 gap-2 hover:bg-base-300"
            >
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={vote.createdBy.photoURL} alt="Created by" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-bold">{vote.createdBy.displayName}</div>
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
