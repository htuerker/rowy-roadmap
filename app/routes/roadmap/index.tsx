import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { getAll, submitVote } from "../../firebase";
import { Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import RoadmapItems from "../../components/roadmap/index";
import { useEffect, useState } from "react";

const getPage = (searchParams: URLSearchParams) =>
  Number(searchParams.get("page") || "1");

const getStatus = (searchParams: URLSearchParams) => searchParams.get("status");
const getSortBy = (searchParams: URLSearchParams) =>
  searchParams.get("sort_by");

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const status = getStatus(url.searchParams);
  const sort_by = getSortBy(url.searchParams);
  const page = getPage(url.searchParams);

  const items = await getAll({ status, sort_by, page });
  return items;
};

const useInfiniteScroll = () => {
  const initialData = useLoaderData();
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
  const { data: items, fetcher, fetchNextPage } = useInfiniteScroll();

  return (
    <>
      <RoadmapItems items={items} />;
      <div className="flex justify-center">
        <button onClick={fetchNextPage} disabled={fetcher.state === "loading"}>
          {fetcher.state === "loading" ? "Loading..." : "Load more!"}
        </button>
      </div>
      <Outlet />
    </>
  );
}
