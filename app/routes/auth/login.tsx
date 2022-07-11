import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LoginButton } from "~/components/auth";
import { firebaseClientConfig } from "~/firebase-admin.server";
import { createUserSession } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  return firebaseClientConfig;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const token = formData.get("token");

  if (token) {
    return createUserSession(String(token), "/roadmap");
  }
  return null;
};

export default function Login() {
  const firebaseClientConfig = useLoaderData();
  return <LoginButton firebaseConfig={firebaseClientConfig} />;
}
