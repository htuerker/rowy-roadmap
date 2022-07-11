import { Dialog } from "@headlessui/react";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

const ItemDialog = ({ item, open, onClose }: any) => {
  const itemRef = useRef(item);
  const fetcher = useFetcher();
  const [votes, setVotes] = useState<any>([]);

  if (itemRef.current !== item) {
    itemRef.current = item;
    setVotes([]);
  }
  useEffect(() => {
    if (!item) return;
    fetcher.load(`/roadmap/${item.id}/votes`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    if (fetcher.data && fetcher.data.length > 0) {
      setVotes((votes: any) => [...votes, ...fetcher.data]);
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
          <div>Votes</div>
          {votes.length > 0 &&
            votes.map((vote: any, index: number) => (
              <div key={index}>{vote.comment}</div>
            ))}
          <button onClick={() => onClose(false)}>Exit Dialog</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ItemDialog;
