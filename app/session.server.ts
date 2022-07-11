import { createCookieSessionStorage, redirect } from "@remix-run/node";

import { auth } from "./firebase-admin.server";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(token: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("idToken", token);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getIdToken(request: Request) {
  const session = await getUserSession(request);
  const idToken = session.get("idToken");
  if (!idToken || typeof idToken !== "string") return null;
  return idToken;
}

export async function requireUser(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const idToken = await getIdToken(request);
  if (!idToken || typeof idToken !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return await getUser(request);
}

export async function getUser(request: Request) {
  const idToken = await getIdToken(request);
  if (typeof idToken !== "string") {
    return null;
  }
  return auth.verifyIdToken(idToken).then(
    (user) => user,
    (error) => {
      throw new Error("Could not verify session!");
    }
  );
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
