import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { itemId } = params;
  return Array(Number(itemId)).fill(`timelog-${itemId}`);
};
