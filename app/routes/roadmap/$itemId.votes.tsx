import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { createVote, getItem, getVotes } from "~/api.server";
import ItemVotes from "~/components/roadmap/votes";
import ItemNavbar from "~/components/roadmap/item-navbar";
import Container from "~/components/ui/container";
import type { RoadmapItem } from "~/models/RoadmapItem";
import type { Vote } from "~/models/Vote";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { itemId } = params;
  const [item, votes] = await Promise.all([getItem(itemId), getVotes(itemId)]);
  return { item, votes };
};

export const action: ActionFunction = async ({ request }: any) => {
  const formData = await request.formData();
  const itemId = formData.get("itemId");
  const vote = formData.get("vote");
  const comment = formData.get("comment");
  await createVote(request, { itemId, vote, comment });
  return null;
};

export default function Votes() {
  const { item, votes }: { item: RoadmapItem; votes: Vote[] } = useLoaderData();

  return (
    <Container>
      <ItemNavbar item={item} />
      <ItemVotes item={item} votes={votes} />
      <Outlet />
    </Container>
  );
}
