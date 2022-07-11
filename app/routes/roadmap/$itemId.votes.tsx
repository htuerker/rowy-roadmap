import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createVote, getVotes } from "~/api.server";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { itemId } = params;
  const votes = await getVotes(itemId);
  return votes;
};

export const action: ActionFunction = async ({ request }: any) => {
  const formData = await request.formData();
  const itemId = formData.get("docId");
  const vote = formData.get("vote");
  await createVote(request, { itemId, vote });
  return null;
};
