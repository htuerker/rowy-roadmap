import { Dialog } from "@headlessui/react";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

const ItemDialog = ({ item, open, onClose }: any) => {
  const itemRef = useRef(item);
  const fetcher = useFetcher();
  const [votes, setVotes] = useState<any>([]);
  const [timelog, setTimelog] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState("votes");

  if (itemRef.current !== item) {
    itemRef.current = item;
    setVotes([]);
    setTimelog([]);
    setCurrentTab("votes");
  }
  useEffect(() => {
    if (!item) return;
    console.log("fetching...");
    fetcher.load(`/roadmap/${item.id}/${currentTab}`);
  }, [item, currentTab]);

  useEffect(() => {
    if (fetcher.data && fetcher.data.length > 0) {
      if (currentTab === "votes") {
        setVotes((votes: any) => [...votes, ...fetcher.data]);
      }
      if (currentTab === "timelog") {
        setTimelog((timelog: any) => [...timelog, ...fetcher.data]);
      }
    }
  }, [fetcher.data]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed w-full md:w-3/4 h-full md:h-2/3 bg-white flex items-center justify-center p-4">
        <Dialog.Panel>
          {item && (
            <>
              <div>{item.feature}</div>
              <div>{item.description}</div>
            </>
          )}
          <div
            onClick={() => currentTab !== "votes" && setCurrentTab("votes")}
            className={`${currentTab === "votes" ? "bg-red-300" : " "}`}
          >
            Votes
          </div>
          <div
            onClick={() => currentTab !== "timelog" && setCurrentTab("timelog")}
            className={`${currentTab === "timelog" ? "bg-red-300" : " "}`}
          >
            Timelog
          </div>

          {currentTab === "votes" &&
            votes.length > 0 &&
            votes.map((vote: any) => <div key={vote}>{vote}</div>)}
          {currentTab === "timelog" &&
            timelog.length > 0 &&
            timelog.map((timelog: any) => <div key={timelog}>{timelog}</div>)}
          <button onClick={() => onClose(false)}>Exit Dialog</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ItemDialog;
