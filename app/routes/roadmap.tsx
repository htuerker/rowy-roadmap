import type { LoaderFunction } from "@remix-run/node";
import { firebaseClientConfig } from "~/firebase-admin.server";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getAll } from "~/api.server";
import { getUser } from "~/session.server";

import Navbar from "~/components/ui/navbar";

export const loader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const currentUser = await getUser(request);
  const items = await getAll(request);
  return {
    currentUser,
    items,
    firebaseClientConfig,
  };
};

export default function Roadmap() {
  const { currentUser, firebaseClientConfig } = useLoaderData();

  return (
    <>
      <Navbar user={currentUser} firebaseClientConfig={firebaseClientConfig} />
      <Outlet />
    </>
  );
}
