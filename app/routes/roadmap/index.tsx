import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";
import RoadmapItems from "../../components/roadmap/items";
import { getAll } from "~/api.server";
import Spinner from "~/components/ui/spinner";
import ItemsNavbar from "~/components/roadmap/items-navbar";
import Container from "~/components/ui/container";
import { useState } from "react";
import type { RoadmapItem } from "~/models/RoadmapItem";

export const loader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const [items, userVotes] = await getAll(request);
  return {
    items,
    userVotes,
  };
};

export default function Items() {
  const { items, userVotes } = useLoaderData();
  const transition = useTransition();
  const isLoading = transition.state === "loading";
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Testing" | "In Progress" | "Launched"
  >("All");
  const [sortBy, setSortBy] = useState<"Most Voted" | "Most Recent">(
    "Most Voted"
  );
  if (isLoading)
    return (
      <div className="h-48 w-full">
        <Container>
          <Spinner />
        </Container>
      </div>
    );

  const filteredItems =
    activeFilter === "All"
      ? items
      : items.filter((item: RoadmapItem) => item.status === activeFilter);

  return (
    <Container>
      <ItemsNavbar
        filter={activeFilter}
        handleFilterChange={setActiveFilter}
        sortBy={sortBy}
        handleSortByChange={setSortBy}
      />
      <RoadmapItems items={filteredItems} userVotes={userVotes} />
      <Outlet />
    </Container>
  );
}
