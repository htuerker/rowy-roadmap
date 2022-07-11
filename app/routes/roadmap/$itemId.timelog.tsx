import type { LoaderFunction } from "@remix-run/node";
import { getVotes } from "~/api.server";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { itemId } = params;
  return await getVotes(itemId);
};
