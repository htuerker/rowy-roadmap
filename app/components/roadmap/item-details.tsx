import { RoadmapItem } from "~/models/RoadmapItem";
import { Vote } from "~/models/Vote";
import Container from "../ui/container";

const ItemDetails = ({
  item,
  votes,
  timelog,
}: {
  item: RoadmapItem;
  votes?: Vote[];
  timelog?: any;
}) => {
  return (
    <>
      <div>{item.feature}</div>
      <div>{item.description}</div>
      {votes && votes.length > 0 && (
        <div>{votes.map((vote) => vote.comment)}</div>
      )}
    </>
  );
};

export default ItemDetails;
