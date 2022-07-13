import type { LoaderFunction } from "@remix-run/node";
import { Params, useLocation } from "@remix-run/react";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";
import { getItem } from "~/api.server";
import ListItem from "~/components/roadmap/list-item";
import Spinner from "~/components/ui/spinner";

export const loader: LoaderFunction = async ({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) => {
  const { itemId } = params;
  if (!itemId) {
    // TODO error handling
    throw Error("Not found!");
  }
  const item = await getItem(itemId);
  return {
    item,
  };
};

export default function Items() {
  const { item } = useLoaderData();
  const transition = useTransition();
  const isLoading = transition.state === "loading";

  if (isLoading) return <Spinner />;

  return (
    <>
      <ListItem item={item} />
      <Outlet />
    </>
  );
}
