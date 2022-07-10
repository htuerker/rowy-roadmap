import { Form } from "@remix-run/react";

const GridItem = ({ item }: any) => (
  <div
    key={item.id}
    className="flex sm:w-full md:w-3/5 overflow-hidden border-b m-auto p-1 gap-2"
  >
    <Form method="post" className="flex flex-col gap-1">
      <input type="hidden" name="docId" value={item.id} />
      <button
        className=" bg-gray-100 hover:bg-gray-200 text-gray-800 py-0.5 px-1 rounded"
        type="submit"
        name="vote"
        value="Yes"
      >
        👍
      </button>
      <button
        className=" bg-gray-100 hover:bg-gray-200 text-gray-800 py-0.5 px-1 rounded"
        type="submit"
        name="vote"
        value="Meh"
      >
        👎
      </button>
      <button
        className=" bg-gray-100 hover:bg-gray-200 text-gray-800 py-0.5 px-1 rounded"
        type="submit"
        name="vote"
        value="Urgent"
      >
        🔥
      </button>
    </Form>
    <div className="flex flex-col w-full">
      <div className="font-medium text-stone">{item.feature}</div>
      <div className="-mt-1 user-select-none">
        <span className="user-select-none bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded dark:bg-blue-200 dark:text-blue-800">
          {item.status}
        </span>
      </div>
      <div className="font-light text-sm">{item.description}</div>
    </div>
  </div>
);

export default GridItem;
