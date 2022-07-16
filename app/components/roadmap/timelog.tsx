import type { RoadmapItem } from "~/models/RoadmapItem";
import type { TimelogItem } from "~/models/TimelogItem";

import DiffMatchPatch from "diff-match-patch";

export const generateDiffText = (before: string, after: string) => {
  const dmp = new DiffMatchPatch();

  return dmp.diff_main(before, after).map((diff: any) => {
    if (diff[0] === 0) {
      return <span className="text-blue-500">{diff[1]}</span>;
    }
    if (diff[0] === -1) {
      return <span className="text-red-500">{diff[1]}</span>;
    }
    return <span className="text-green-500">{diff[1]}</span>;
  });
};
const Timelog = ({
  item,
  timelog,
}: {
  item: RoadmapItem;
  timelog: TimelogItem[];
}) => {
  return (
    <div className="mt-5">
      <div className="flex flex-col relative pl-12 pb-12 overflow-hidden mb-12">
        <div className="absolute w-1 left-6 h-full bg-primary mt-8">
          {/* Line */}
        </div>
        <div className="relative border-bottom-2 border-b-base-200 mb-12">
          <div className="absolute top-0 bottom-0 my-auto w-5 h-5 -left-8 rounded-full bg-primary"></div>
          Created by{" "}
          <div className="font-bold">{item.createdBy.displayName}</div> at{" "}
          {item.createdBy.date}
        </div>
        {timelog.map((log, index) => (
          <div key={index} className="relative h-20">
            <div className="absolute top-0 bottom-0 my-auto w-5 h-5 -left-8 rounded-full bg-primary"></div>
            <div>
              <div>{log.actor.displayName}</div>
            </div>
            <div>
              {log.changedFields.map((field) => {
                if (field.fielKey === "status") {
                  if (!field.after) {
                    return `Removed ${field.before} status`;
                  }
                  return `Updated status to ${field.after}`;
                }
                if (field.fielKey === "feature") {
                  return `Updated title from ${field.before} to ${field.after}`;
                }
                if (field.fielKey === "description") {
                  return generateDiffText(field.before, field.after);
                  // return `Updated desctiption from ${field.before} to ${field.after}`;
                }
                if (field.fielKey === "targetRelease") {
                  if (!field.after) {
                    return `Removed target release date`;
                  }
                  return `Updated Target Release from ${field.before} to ${field.after}`;
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timelog;
