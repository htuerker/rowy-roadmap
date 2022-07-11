import type { ActionFunction } from "@remix-run/node";
import { Login } from "~/components/auth";
import { createUserSession } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const token = formData.get("token");

  if (token) {
    return createUserSession(String(token), "/roadmap");
  }
  return null;
};

export default function LoginPage() {
  return <Login />;
}
