import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { firebaseClientConfig } from "~/firebase-admin.server";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";
import RoadmapItems from "../../components/roadmap/index";
import { getUser, requireUser } from "~/session.server";
import { LogoutButton } from "~/components/auth";
import { createVote, getAll } from "~/api.server";
import Spinner from "~/components/ui/spinner";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request, "/roadmap");
  const currentUser = await getUser(request);
  const items = await getAll();
  return { currentUser, items, firebaseClientConfig };
};
export default function Index() {
  const { currentUser, items, firebaseClientConfig } = useLoaderData();
  const transition = useTransition();
  const isLoading = transition.state === "loading";

  if (isLoading) return <Spinner />;

  return (
    <>
      <div>{currentUser.name}</div>
      <LogoutButton firebaseConfig={firebaseClientConfig} />
      <RoadmapItems items={items} />
      <Outlet />
    </>
  );
}
