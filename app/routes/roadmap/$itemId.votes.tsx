import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createVote, getVotes } from "~/api.server";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { itemId } = params;
  return await getVotes(itemId);
};

export const action: ActionFunction = async ({ request, params }: any) => {
  const formData = request.formData();
  const vote = formData.get("vote");
  const { itemId } = params;
  return await createVote({ itemId, vote });
};
