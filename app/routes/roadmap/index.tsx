import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { firebaseClientConfig } from "~/firebase-admin.server";
import { Outlet, useLoaderData } from "@remix-run/react";
import RoadmapItems from "../../components/roadmap/index";
import { getUser, requireUser } from "~/session.server";
import { LogoutButton } from "~/components/auth";
import { createVote, getAll } from "~/api.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request, "/roadmap");
  const currentUser = await getUser(request);
  const items = await getAll();
  return { currentUser, items, firebaseClientConfig };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  await createVote({
    docId: formData.get("docId"),
    vote: formData.get("vote"),
  });
  return null;
};

export default function Index() {
  const { currentUser, items, firebaseClientConfig } = useLoaderData();
  return (
    <>
      <div>{currentUser.name}</div>
      <LogoutButton firebaseConfig={firebaseClientConfig} />
      <RoadmapItems items={items} />
      <Outlet />
    </>
  );
}
