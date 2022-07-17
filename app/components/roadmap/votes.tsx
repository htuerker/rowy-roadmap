import type { RoadmapItem } from "~/models/RoadmapItem";
import type { Vote } from "~/models/Vote";
import {
  IconChevronDown,
  IconChevronUp,
  IconEmptyClipboard,
  IconFire,
} from "../svg";

const Votes = ({ item, votes }: { item: RoadmapItem; votes: Vote[] }) => {
  return (
    <div>
      {votes.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-5 p-10 text-base-content">
          <IconEmptyClipboard className="w-12 h-12" />
          <span className="text-xl font-light">No Comments Yet!</span>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="text-xl py-2 px-1 md:pl-6">Comments</div>
          {votes.map((vote, index) => (
            <div
              key={index}
              className="px-1 md:px-2 md:pl-6 flex w-full overflow-hidden border-b-2 border-b-base-300 py-4 gap-2 hover:bg-base-300"
            >
              <div className="py-1">
                <div className="flex justify-center items-center w-14 h-10 bg-primary text-primary-content rounded-lg">
                  {vote.vote === "Urgent" && (
                    <IconFire className="w-8 h-8 text-sm" />
                  )}
                  {vote.vote === "Yes" && <IconChevronUp className="w-8 h-8" />}
                  {vote.vote === "Meh" && (
                    <IconChevronDown className="w-8 h-8" />
                  )}
                </div>
              </div>
              <div className="avatar">
                <div className="w-12 h-12 rounded-full">
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

export default Votes;
