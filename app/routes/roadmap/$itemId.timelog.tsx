import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { createVote, getItem, getTimelog, getVotes } from "~/api.server";
import ItemComments from "~/components/roadmap/item-votes";
import ItemNavbar from "~/components/roadmap/item-navbar";
import Container from "~/components/ui/container";
import type { RoadmapItem } from "~/models/RoadmapItem";
import ItemTimelog from "~/components/roadmap/item.timelog";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { itemId } = params;
  const [item, timelog] = await Promise.all([
    getItem(itemId),
    getTimelog(itemId),
  ]);
  console.log(timelog);
  return { item, timelog };
};

export default function Votes() {
  const { item, timelog }: { item: RoadmapItem; timelog: any } =
    useLoaderData();

  return (
    <Container>
      <ItemNavbar item={item} />
      <ItemTimelog item={item} timelog={timelog} />
      <Outlet />
    </Container>
  );
}
