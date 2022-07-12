import { useFetcher } from "@remix-run/react";

const VoteForm = ({ id, vote }: { id: string; vote: string }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action={`/roadmap/${id}/votes`} method="post" className="hidden">
      <input type="hidden" name="docId" value={id} />
      <input type="hidden" name="vote" value={vote} />
      <button type="submit"></button>
    </fetcher.Form>
  );
};

export default VoteForm;
