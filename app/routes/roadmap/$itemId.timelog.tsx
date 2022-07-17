import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getItem, getTimelog } from "~/api.server";
import ItemNavbar from "~/components/roadmap/item-navbar";
import Container from "~/components/ui/container";
import type { RoadmapItem } from "~/models/RoadmapItem";
import ItemTimelog from "~/components/roadmap/timelog";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { itemId } = params;
  const [item, timelog] = await Promise.all([
    getItem(itemId),
    getTimelog(itemId),
  ]);
  return { item, timelog };
};

export default function Timelog() {
  const { item, timelog }: { item: RoadmapItem; timelog: any } =
    useLoaderData();

  return (
    <Container>
      <ItemNavbar item={item} />
      <ItemTimelog timelog={timelog} />
      <Outlet />
    </Container>
  );
}
