import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";
import RoadmapItems from "../../components/roadmap/index";
import { getAll } from "~/api.server";
import Spinner from "~/components/ui/spinner";
import RoadmapNavbar from "~/components/roadmap/roadmap-navbar";
import Container from "~/components/ui/container";
import { useState } from "react";
import { RoadmapItem } from "~/models/RoadmapItem";

export const loader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const items = await getAll(request);
  return {
    items,
  };
};

export default function Items() {
  const { items } = useLoaderData();
  const transition = useTransition();
  const isLoading = transition.state === "loading";
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Testing" | "In Progress" | "Launched"
  >("All");
  if (isLoading) return <Spinner />;

  const filteredItems =
    activeFilter === "All"
      ? items
      : items.filter((item: RoadmapItem) => item.status === activeFilter);

  return (
    <Container>
      <RoadmapNavbar
        activeFilter={activeFilter}
        handleFilterChange={setActiveFilter}
      />
      <RoadmapItems items={filteredItems} viewMode="list" />
      <Outlet />
    </Container>
  );
}
