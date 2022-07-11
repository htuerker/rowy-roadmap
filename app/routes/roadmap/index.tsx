import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { getAll, submitVote } from "~/firebase-admin.server";
import { Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import RoadmapItems from "../../components/roadmap/index";
import { useEffect, useState } from "react";
import { requireUser } from "~/session.server";
import { LogoutButton } from "~/components/auth";

export const loader: LoaderFunction = async ({ request }) => {
  const currentUser = await requireUser(request, "/roadmap");
  const data = await getAll();
  console.log(currentUser);
  return { currentUser, data };
};

const useInfiniteScroll = (initialData: any) => {
  const [data, setData] = useState(initialData);
  const fetcher = useFetcher();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page <= 1) {
      return;
    }

    if (fetcher.data && fetcher.data.length > 0) {
      setData((data: any) => [...data, ...fetcher.data]);
    }
  }, [fetcher.data, page]);

  const fetchNextPage = () => {
    fetcher.load(`/roadmap?index&${page}`);
    setPage((page) => page + 1);
  };

  return { data, fetcher, fetchNextPage };
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
  const { currentUser, data } = useLoaderData();
  const { data: items, fetcher, fetchNextPage } = useInfiniteScroll(data);

  return (
    <>
      <div>{JSON.stringify(currentUser)}</div>
      <LogoutButton />
      <RoadmapItems items={items} />
      <div className="flex justify-center">
        <button onClick={fetchNextPage} disabled={fetcher.state === "loading"}>
          {fetcher.state === "loading" ? "Loading..." : "Load more!"}
        </button>
      </div>
      <Outlet />
    </>
  );
}
