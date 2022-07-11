import { useFetcher } from "@remix-run/react";

const VoteForm = ({
  id,
  vote,
  text,
}: {
  id: string;
  vote: string;
  text: string;
}) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      action={`/roadmap/${id}/votes`}
      method="post"
      className="flex flex-col gap-1"
    >
      <input type="hidden" name="docId" value={id} />
      <input type="hidden" name="vote" value={vote} />
      <button
        className=" bg-gray-100 hover:bg-gray-200 text-gray-800 py-0.5 px-1 rounded"
        type="submit"
      >
        {text}
      </button>
    </fetcher.Form>
  );
};

export default VoteForm;
