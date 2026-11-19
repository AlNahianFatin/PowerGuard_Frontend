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
import { useState, type Dispatch, type SetStateAction } from "react";
import TablePagination from "@/components/ui/table-pagination";
import { SearchX } from "lucide-react";
import ScheduleUserDetailSheet from "./schedule-user-detail-sheet";

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
  const [userDetailOpen, setUserDetailOpen] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  const { data } = useSuspenseAllSchedules(params);

  const schedules = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const isEmpty = schedules.length === 0;

  // if (isEmpty) {
  //   return (
  //     <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
  //       No schedules found. Create your first schedule to start publishing scheduled outages.
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200/70 hover:bg-transparent">
              <TableHead className="text-center min-w-38">Starting Date & Time</TableHead>
              <TableHead className="text-center min-w-38">Ending Date & Time</TableHead>
              <TableHead className="text-center min-w-27">Created by</TableHead>
              <TableHead className="text-center min-w-10">Reason</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center min-w-30">Feeder</TableHead>
              <TableHead className="text-center">Deleted</TableHead>
              <TableHead className="text-center min-w-27">Deleted by</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              isEmpty ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={60}>
                    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                      <span className="rounded-full bg-muted p-3">
                        <SearchX className="size-5 text-muted-foreground" />
                      </span>
                      <p className="font-medium">No schedule found</p>
                      <p className="max-w-sm text-sm text-muted-foreground">
                        {params.searchTerm
                          ? `No results for "${params.searchTerm}". Try a different keyword`
                          : "There are no matching schedule for this category yet"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                schedules.map((schedule) => (
                  <TableRow key={schedule.id} className="hover:bg-gray-300/30 shadow-lg text-center text-muted-foreground">
                    {/* <TableCell>
                <div className="font-medium">
                  {formatDateTime(schedule.startDateTime)}
                </div>
                <div className="text-xs text-muted-foreground">
                  to {formatDateTime(schedule.endDateTime)}
                </div>
              </TableCell> */}

                    <TableCell>
                      {new Date(schedule.startDateTime).toLocaleString()}
                    </TableCell>

                    <TableCell>
                      {new Date(schedule.endDateTime).toLocaleString()}
                    </TableCell>

                    <TableCell className="max-w-60 overflow-x-auto">
                      <Button className="font-normal p-0 m-0 bg-transparent text-muted-foreground underline hover:bg-transparent" onClick={() => {
                        setIsCreator(true); setUserDetailOpen(true);
                      }}>
                        {schedule.createdByUser.name}
                      </Button>
                    </TableCell>

                    <TableCell className="overflow-x-auto max-w-60">
                      {schedule.reason}
                    </TableCell>

                    <TableCell>
                      <span
                        className={
                          schedule.status === "PUBLISHED"
                            ? "text-primary"
                            : "text-amber-600"
                        }
                      >
                        {schedule.status}
                      </span>
                    </TableCell>

                    {/* <TableCell className="text-center text-muted-foreground">
                  {new Date(schedule.createdAt).toLocaleString()}
                </TableCell> */}

                    <TableCell>
                      {schedule.feeder.name}
                    </TableCell>


                    <TableCell>
                      <span
                        className={
                          schedule.isDeleted === true
                            ? "text-red-600"
                            : "text-primary"
                        }
                      >
                        {
                          schedule.isDeleted === true
                            ? "YES"
                            : "NO"
                        }
                      </span>
                    </TableCell>

                    <TableCell className="max-w-60 overflow-x-auto">
                      {
                        schedule.deletedByUser?.name ?
                          <Button className="font-normal p-0 m-0 bg-transparent text-muted-foreground underline hover:bg-transparent" onClick={() => {
                            setIsCreator(false); setUserDetailOpen(true);
                          }}>
                            {schedule.createdByUser.name}
                          </Button> :
                          "-"
                      }
                    </TableCell>

                    <TableCell className="text-right">
                      <ScheduleActions schedule={schedule} />
                    </TableCell>

                    <ScheduleUserDetailSheet
                      user={!isCreator && schedule.deletedByUser ? schedule.deletedByUser : schedule.createdByUser}
                      isCreator={isCreator}
                      open={userDetailOpen}
                      onClose={() => setUserDetailOpen(false)}
                    />
                  </TableRow>
                ))
              )
            }
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
