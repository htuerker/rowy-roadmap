import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { getAll, submitVote } from "~/firebase";
import { useLoaderData } from "@remix-run/react";
import RoadmapItems from "~/components/Roadmap";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const sortBy = url.searchParams.get("sort_by");
  const items = await getAll({ status, sortBy });
  return { items };
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
  const { items } = useLoaderData();
  return <RoadmapItems items={items} />;
}
