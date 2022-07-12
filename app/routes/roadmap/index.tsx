import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { firebaseClientConfig } from "~/firebase-admin.server";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";
import RoadmapItems from "../../components/roadmap/index";
import { getAll } from "~/api.server";
import Spinner from "~/components/ui/spinner";
import { getUser } from "~/session.server";

import Navbar from "~/components/ui/navbar";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request, params }) => {
  const filter = new URL(request.url).searchParams.get("filter") ?? "Idea";
  const currentUser = await getUser(request);
  const items = await getAll(request);
  return {
    currentUser,
    items: items,
    activeFilter: filter,
    firebaseClientConfig,
  };
};

export default function Index() {
  const { currentUser, items, firebaseClientConfig, activeFilter } =
    useLoaderData();
  const transition = useTransition();
  const isLoading = transition.state === "loading";
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const toggleViewMode = () => {
    setViewMode((viewMode) => (viewMode === "list" ? "grid" : "list"));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Navbar
        user={currentUser}
        firebaseClientConfig={firebaseClientConfig}
        viewMode={viewMode}
        activeFilter={activeFilter}
        toggleViewMode={toggleViewMode}
      />
      <RoadmapItems items={items} viewMode={viewMode} />
      <Outlet />
    </>
  );
}
