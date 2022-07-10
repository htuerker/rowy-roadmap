import { Form, useSearchParams, useSubmit } from "@remix-run/react";

const filtersGroups = [
  { name: "sort_by", filters: ["popular", "recent"] },
  { name: "status", filters: ["in-progress", "pending", "completed"] },
];

const Filters = () => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const activeFilters = filtersGroups.map((group) =>
    searchParams.get(group.name)
  );
  return (
    <Form
      method="get"
      onChange={(e) => submit(e.currentTarget)}
      className="flex gap-1"
    >
      {filtersGroups.map((group) =>
        group.filters.map((filter, index) => (
          <div key={index}>
            <label
              className={`${
                activeFilters.includes(filter) ? "bg-red-200" : ""
              }`}
              htmlFor={filter}
            >
              {filter}
            </label>
            <input
              className="hidden"
              type="radio"
              id={filter}
              name={group.name}
              value={filter}
            />
          </div>
        ))
      )}
    </Form>
  );
};

export default Filters;
