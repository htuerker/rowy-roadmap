import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { LoginButton } from "~/components/auth";
import { createUserSession, getUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const currentUser = await getUser(request);
  if (currentUser) {
    throw redirect("/");
  }
  return null;
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
  return <LoginButton />;
}
