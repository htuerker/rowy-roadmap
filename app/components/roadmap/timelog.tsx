import type { RoadmapItem } from "~/models/RoadmapItem";
import type { TimelogItem } from "~/models/TimelogItem";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import StatusBadge from "../ui/status-badge";

dayjs.extend(localizedFormat);

const Timelog = ({ timelog }: { timelog: TimelogItem[] }) => {
  const humanizeDate = (date: Date) => dayjs(date).format("LL");

  const generateTextDiffField = (
    before: string | null,
    after: string | null
  ) => (
    <>
      <span className="text-red-400/80 line-through">{before}</span>
      <span className="text-green-400/80 pl-1">{after}</span>
    </>
  );

  const parseChange = (field: { fielKey: string; before: any; after: any }) => {
    if (field.fielKey === "status") {
      if (!field.after) {
        return (
          <span>
            removed
            <span className="inline-flex px-2 py-1 mx-1 rounded-lg bg-base-200 font-bold">
              Status
            </span>
          </span>
        );
      }
      return (
        <span>
          updated
          <span className="inline-flex px-2 py-1 mx-1 rounded-lg bg-base-200 font-bold">
            Status
          </span>
          to
          <span className="inline-flex mx-1">
            <StatusBadge status={field.after} />
          </span>
        </span>
      );
    }
    if (field.fielKey === "feature" || field.fielKey === "description") {
      return (
        <span>
          updated
          <span className="inline-flex px-2 py-1 mx-1 rounded-lg bg-base-200 font-bold">
            {field.fielKey === "feature" ? "Feature" : "Description"}
          </span>
          {generateTextDiffField(field.before, field.after)}
        </span>
      );
    }
    if (field.fielKey === "targetRelease") {
      if (!field.after) {
        return (
          <span>
            removed
            <span className="inline-flex px-2 py-1 mx-1 rounded-lg bg-base-200 font-bold">
              Target Release
            </span>
          </span>
        );
      }
      return (
        <span>
          updated
          <span className="inline-flex px-2 py-1 mx-1 rounded-lg bg-base-200 font-bold">
            Target Release
          </span>
          to
          {dayjs.unix(field.after._seconds).format("LL")}
        </span>
      );
    }
    return null;
  };

  const groupByDate: { [key: string]: TimelogItem[] } = timelog.reduce(
    (hash: any, log: TimelogItem) => {
      const dateString = dayjs(log.actor.date).format("LL");
      if (hash[dateString]) {
        hash[dateString].push(log);
      } else {
        hash[dateString] = [log];
      }
      return hash;
    },
    {}
  );

  return (
    <div className="mt-5">
      <div className="flex flex-col relative pl-12 overflow-hidden">
        <div className="absolute w-1 left-6 h-full pt-2 pb-12">
          <div className="w-1 h-full bg-primary"></div>
          {/* Timelog Line */}
        </div>
        {Object.keys(groupByDate).map((dateKey: string, index: number) => {
          return (
            <div key={`0-${index}`} className="relative mb-10 select-none">
              <div className="absolute top-2 w-5 h-5 -left-8 rounded-full bg-primary">
                {/* Timelog dot */}
              </div>
              <div className="inline-flex px-2 py-1 -ml-1 rounded-lg bg-base-200 font-bold">
                {dateKey}
              </div>
              <div className="flex flex-col gap-1">
                {groupByDate[dateKey]
                  .sort((log1: TimelogItem, log2: TimelogItem) =>
                    log1.actor.date! > log2.actor.date! ? -1 : 1
                  )
                  .map((log: TimelogItem, index: number) => (
                    <div key={`1-${index}`}>
                      <span className="font-bold">{log.actor.displayName}</span>{" "}
                      {log.changedFields.map((field) => parseChange(field))}
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timelog;
