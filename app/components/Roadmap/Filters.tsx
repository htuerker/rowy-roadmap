import { useSubmit } from "@remix-run/react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

const sortByFilters = ["popular", "recent"];
const statusFilters = ["in-progress", "pending", "completed"];

const filterMapper = (filter: string) => {
  switch (filter) {
    case "popular":
      return "Popular";
    case "recent":
      return "Recent";
    case "in-progress":
      return "In Progress";
    case "pending":
      return "Pending";
    case "completed":
      return "Complete";
    default:
      return null;
  }
};

const Filters = ({ activeFilters }: any) => {
  const submit = useSubmit();
  const { sort_by, status } = activeFilters;

  return (
    <Popover className="w-full bg-white py-1 shadow-lg ">
      <div className="inline-block gap-1 px-1">
        {(sort_by || status) && (
          <>
            Active filters:
            {sort_by && (
              <button
                type="button"
                className="inline-block px-2 py-1 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                onClick={() => {
                  status ? submit({ status }) : submit({});
                }}
              >
                {sort_by}
              </button>
            )}
            {status && (
              <button
                type="button"
                className="inline-block px-2 py-1 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                onClick={() => {
                  sort_by ? submit({ sort_by }) : submit({});
                }}
              >
                {status}
              </button>
            )}
          </>
        )}
      </div>
      <Popover.Button className="flex items-center float-right relative px-1 text-gray-800 outline-none">
        <span>Filters</span>
        <ChevronDownIcon
          className="float-right w-6 text-slate-400 "
          aria-hidden="true"
        />
      </Popover.Button>
      <Popover.Panel className="w-full mt-1 absolute p-2 overflow-auto rounded-md rounded-t-none bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <div>Relevant: </div>
            {sortByFilters.map((filter) => (
              <div key={filter}>
                <button
                  type="button"
                  onClick={() =>
                    submit(
                      status ? { sort_by: filter, status } : { sort_by: filter }
                    )
                  }
                  className={`inline-block px-1 py-0.5 border-2 ${
                    filter === sort_by
                      ? "bg-red-100"
                      : "border-blue-600 text-blue-600"
                  } font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
                >
                  {filterMapper(filter)}
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            <div>Status: </div>
            {statusFilters.map((filter) => (
              <div key={filter}>
                <button
                  type="button"
                  onClick={() =>
                    submit(
                      sort_by ? { status: filter, sort_by } : { status: filter }
                    )
                  }
                  className={`inline-block px-1 py-0.5 border-2 ${
                    filter === status
                      ? "bg-red-100"
                      : "border-blue-600 text-blue-600"
                  } font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
                >
                  {filterMapper(filter)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default Filters;
