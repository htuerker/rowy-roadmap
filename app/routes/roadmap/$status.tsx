import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { status } = params;
  return null;
};
