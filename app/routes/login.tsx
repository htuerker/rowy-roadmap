import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Login from "~/components/auth/login";
import { clientConfig } from "~/firebase";

export const loader: LoaderFunction = async () => {
  return clientConfig;
};

export default function LoginPage() {
  const config = useLoaderData();
  return <Login firebaseConfig={config} />;
}
