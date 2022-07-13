import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useTransition,
} from "@remix-run/react";
import { createVote, getItem, getVotes } from "~/api.server";
import ItemDetails from "~/components/roadmap/item-details";
import ItemNavbar from "~/components/roadmap/item-navbar";
import Container from "~/components/ui/container";
import Spinner from "~/components/ui/spinner";
import { RoadmapItem } from "~/models/RoadmapItem";
import { Vote } from "~/models/Vote";
export const loader: LoaderFunction = async ({ params }: any) => {
  const { itemId } = params;
  const [item, votes] = await Promise.all([getItem(itemId), getVotes(itemId)]);
  return { item, votes };
};

export const action: ActionFunction = async ({ request }: any) => {
  const formData = await request.formData();
  const itemId = formData.get("docId");
  const vote = formData.get("vote");
  await createVote(request, { itemId, vote });
  return null;
};

export default function Comments() {
  const location = useLocation();
  const { item, votes }: { item: RoadmapItem; votes: Vote[] } = useLoaderData();
  const transition = useTransition();
  const isLoading = transition.state === "loading";

  return (
    <Container>
      <ItemNavbar item={item} />
      {isLoading ? <Spinner /> : <ItemDetails item={item} votes={votes} />}
      <Outlet />
    </Container>
  );
}
