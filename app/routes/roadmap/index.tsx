import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";
import RoadmapItems from "../../components/roadmap/index";
import { getAll } from "~/api.server";
import Spinner from "~/components/ui/spinner";
import RoadmapNavbar from "~/components/roadmap/roadmap-navbar";
import Container from "~/components/ui/container";
import { useState } from "react";
import type { RoadmapItem } from "~/models/RoadmapItem";

export const loader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const [items, userVotes] = await getAll(request);
  console.log(userVotes);
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
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
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
      <RoadmapNavbar
        filter={activeFilter}
        handleFilterChange={setActiveFilter}
        sortBy={sortBy}
        handleSortByChange={setSortBy}
        toggleViewMode={() =>
          setViewMode((viewMode) => (viewMode === "list" ? "grid" : "list"))
        }
      />
      <RoadmapItems
        items={filteredItems}
        userVotes={userVotes}
        viewMode={viewMode}
      />
      <Outlet />
    </Container>
  );
}
