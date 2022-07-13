import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";
import RoadmapItems from "../../components/roadmap/index";
import { getAll } from "~/api.server";
import Spinner from "~/components/ui/spinner";

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

  if (isLoading) return <Spinner />;

  return (
    <>
      <RoadmapItems items={items} viewMode="list" />
      <Outlet />
    </>
  );
}
