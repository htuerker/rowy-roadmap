import { useFetcher } from "@remix-run/react";
import type { RoadmapItem } from "~/models/RoadmapItem";
import type { Vote } from "~/models/Vote";
import IconChevronDown from "../svg/icon-chevron-down";
import IconChevronUp from "../svg/icon-chevron-up";
import IconFire from "../svg/icon-fire";
import Spinner from "../ui/spinner";

const ListItemVoteField = ({
  item,
  vote,
}: {
  item: RoadmapItem;
  vote?: Vote;
}) => {
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";

  return (
    <ul className="menu menu-compact bg-inherit rounded-box gap-1 items-center p-0 relative">
      <div
        className={`${
          busy ? "block" : "hidden"
        } absolute inset-0 bg-base-300/30 z-50`}
      >
        <Spinner />
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip={vote?.vote === "Urgent" ? "Unvote" : "Urgent"}
      >
        <li
          className={`rounded-lg ${busy ? "disabled" : ""} ${
            vote?.vote === "Urgent"
              ? "bg-primary hover:bg-primary-focus text-primary-content"
              : ""
          }`}
        >
          <button
            disabled={busy}
            onClick={() => {
              fetcher.submit(
                { itemId: item.id, vote: "Urgent" },
                { action: `/roadmap/${item.id}/votes`, method: "post" }
              );
            }}
          >
            <IconFire />
          </button>
        </li>
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip={vote?.vote === "Yes" ? "Unvote" : "Upvote"}
      >
        <li
          className={`rounded-lg ${busy ? "disabled" : ""} ${
            vote?.vote === "Yes"
              ? "bg-primary hover:bg-primary-focus text-primary-content"
              : ""
          }`}
        >
          <button
            disabled={busy}
            onClick={() => {
              fetcher.submit(
                { itemId: item.id, vote: "Yes" },
                { action: `/roadmap/${item.id}/votes`, method: "post" }
              );
            }}
          >
            <IconChevronUp />
          </button>
        </li>
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip={vote?.vote === "Meh" ? "Unvote" : "Downvote"}
      >
        <li
          className={`rounded-lg ${busy ? "disabled" : ""} ${
            vote?.vote === "Meh"
              ? "bg-red-600 hover:bg-red-400 text-primary-content"
              : ""
          }`}
        >
          <button
            disabled={busy}
            onClick={() => {
              fetcher.submit(
                { itemId: item.id, vote: "Meh" },
                { action: `/roadmap/${item.id}/votes`, method: "post" }
              );
            }}
          >
            <IconChevronDown />
          </button>
        </li>
      </div>
    </ul>
  );
};

export default ListItemVoteField;
