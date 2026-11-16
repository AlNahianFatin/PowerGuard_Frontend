import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseAllSchedules } from "@/hooks";

import type { ScheduleParams } from "@/types";
import ScheduleActions from "./schedule-actions";
import type { Dispatch, SetStateAction } from "react";
import TablePagination from "@/components/ui/table-pagination";

interface Props extends ScheduleParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}

// function formatDateTime(value: string) {
//   return new Date(value).toLocaleString(undefined, {
//     dateStyle: "medium",
//     timeStyle: "short",
//   });
// }

export default function ScheduleTable({ handlePageChange,
  ...params }: Props) {
  const { data } = useSuspenseAllSchedules(params);

  const schedules = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const isEmpty = schedules.length === 0;

  if (isEmpty) {
    return (
      <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
        No schedules found. Create your first schedule to start accepting
        appointments.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Starting Date & Time</TableHead>
              <TableHead>Ending Date & Time</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Feeder</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                {/* <TableCell>
                <div className="font-medium">
                  {formatDateTime(schedule.startDateTime)}
                </div>
                <div className="text-xs text-muted-foreground">
                  to {formatDateTime(schedule.endDateTime)}
                </div>
              </TableCell> */}

                <TableCell className="text-center text-muted-foreground">
                  {new Date(schedule.startDateTime).toLocaleString()}
                </TableCell>

                <TableCell className="text-center text-muted-foreground">
                  {new Date(schedule.endDateTime).toLocaleString()}
                </TableCell>

                <TableCell>
                  {schedule.reason}
                </TableCell>

                <TableCell>
                  <span
                    className={
                      schedule.status === "PUBLISHED"
                        ? "text-green-600"
                        : "text-amber-600"
                    }
                  >
                    {schedule.status}
                  </span>
                </TableCell>

                <TableCell className="text-center text-muted-foreground">
                  {new Date(schedule.createdAt).toLocaleString()}
                </TableCell>

                <TableCell className="text-center text-muted-foreground">
                  {schedule.feeder.name}
                </TableCell>

                <TableCell className="text-right">
                  <ScheduleActions schedule={schedule} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {
        totalPages > 1 && (
          <div className="my-5">
            <TablePagination
              page={params.page ?? 1}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        )
      }
    </>
  );
}
