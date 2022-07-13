import type { LoaderFunction } from "@remix-run/node";
import { firebaseClientConfig } from "~/firebase-admin.server";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";
import { getAll } from "~/api.server";
import Spinner from "~/components/ui/spinner";
import { getUser } from "~/session.server";

import Navbar from "~/components/ui/navbar";
import { useState } from "react";
import RoadmapNavbar from "~/components/roadmap/roadmap-navbar";

export const loader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}) => {
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
  const { currentUser, firebaseClientConfig, activeFilter } = useLoaderData();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const toggleViewMode = () => {
    setViewMode((viewMode) => (viewMode === "list" ? "grid" : "list"));
  };

  return (
    <>
      <Navbar
        user={currentUser}
        firebaseClientConfig={firebaseClientConfig}
        viewMode={viewMode}
        activeFilter={activeFilter}
        toggleViewMode={toggleViewMode}
      />
      <Outlet />
    </>
  );
}
