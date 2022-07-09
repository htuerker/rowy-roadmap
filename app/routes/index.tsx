import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { getAll, submitVote } from "~/firebase";
import { useLoaderData } from "@remix-run/react";
import RoadmapItems from "~/components/RoadmapItems";

export const loader: LoaderFunction = async () => {
  return await getAll();
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  await submitVote({
    docId: formData.get("docId"),
    vote: formData.get("vote"),
  });
  return null;
};

export default function Index() {
  const items = useLoaderData();
  return <RoadmapItems items={items} />;
}
