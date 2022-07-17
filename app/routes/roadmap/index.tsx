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
    "All" | "Testing" | "In Progress" | "Complete"
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

  const calculateScore = (item: RoadmapItem) =>
    item.votesSummary.Yes -
    item.votesSummary.Meh +
    2 * item.votesSummary.Urgent;

  const filteredItems =
    activeFilter === "All"
      ? items
      : items.filter((item: RoadmapItem) => item.status === activeFilter);

  const sortedItems =
    sortBy === "Most Voted"
      ? filteredItems.sort((item1: RoadmapItem, item2: RoadmapItem) =>
          calculateScore(item1) > calculateScore(item2) ? -1 : 1
        )
      : filteredItems.sort((item1: RoadmapItem, item2: RoadmapItem) =>
          item1.createdBy.date! > item2.createdBy.date! ? -1 : 1
        );

  return (
    <Container>
      <ItemsNavbar
        filter={activeFilter}
        handleFilterChange={setActiveFilter}
        sortBy={sortBy}
        handleSortByChange={setSortBy}
      />
      <RoadmapItems items={sortedItems} userVotes={userVotes} />
      <Outlet />
    </Container>
  );
}
