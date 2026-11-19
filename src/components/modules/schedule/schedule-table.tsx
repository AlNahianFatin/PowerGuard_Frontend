"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";

import { useSuspenseAllSchedules } from "@/hooks";
import type { ScheduleParams, User } from "@/types";

import ScheduleActions from "./schedule-actions";
import ScheduleUserDetailSheet from "./schedule-user-detail-sheet";

interface Props extends ScheduleParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function ScheduleTable({
  handlePageChange,
  ...params
}: Props) {
  const [userDetailOpen, setUserDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreator, setIsCreator] = useState(false);

  const { data } = useSuspenseAllSchedules(params);

  const schedules = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const isEmpty = schedules.length === 0;

  const handleUserClick = (user: User, creator: boolean) => {
    setSelectedUser(user);
    setIsCreator(creator);
    setUserDetailOpen(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200/70 hover:bg-transparent">
              <TableHead className="min-w-38 text-center">
                Starting Date & Time
              </TableHead>
              <TableHead className="min-w-38 text-center">
                Ending Date & Time
              </TableHead>
              <TableHead className="min-w-60 text-center">
                Created by
              </TableHead>
              <TableHead className="min-w-10 text-center">
                Reason
              </TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="min-w-30 text-center">
                Feeder
              </TableHead>
              <TableHead className="text-center">Deleted</TableHead>
              <TableHead className="min-w-60 text-center">
                Deleted by
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isEmpty ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={9}>
                  <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                    <span className="rounded-full bg-muted p-3">
                      <SearchX className="size-5 text-muted-foreground" />
                    </span>

                    <p className="font-medium">No schedule found</p>

                    <p className="max-w-sm text-sm text-muted-foreground">
                      {params.searchTerm
                        ? `No results for "${params.searchTerm}". Try a different keyword`
                        : "There are no matching schedules for this category yet"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              schedules.map((schedule) => (
                <TableRow
                  key={schedule.id}
                  className="shadow-lg text-center text-muted-foreground hover:bg-gray-300/30"
                >
                  <TableCell>
                    {new Date(schedule.startDateTime).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {new Date(schedule.endDateTime).toLocaleString()}
                  </TableCell>

                  <TableCell className="max-w-60 overflow-x-auto">
                    <Button
                      variant="link"
                      className="h-auto p-0 font-normal text-muted-foreground underline hover:text-primary"
                      onClick={() =>
                        handleUserClick(schedule.createdByUser, true)
                      }
                    >
                      {schedule.createdByUser.name}
                    </Button>
                  </TableCell>

                  <TableCell className="max-w-60 overflow-x-auto">
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

                  <TableCell>{schedule.feeder.name}</TableCell>

                  <TableCell>
                    <span
                      className={
                        schedule.isDeleted
                          ? "text-red-600"
                          : "text-primary"
                      }
                    >
                      {schedule.isDeleted ? "YES" : "NO"}
                    </span>
                  </TableCell>

                  <TableCell className="max-w-60 overflow-x-auto">
                    {schedule.deletedByUser ? (
                      <Button
                        variant="link"
                        className="h-auto p-0 font-normal text-muted-foreground underline hover:text-primary"
                        onClick={() =>
                          handleUserClick(schedule.deletedByUser as User, false)
                        }
                      >
                        {schedule.deletedByUser.name}
                      </Button>
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <ScheduleActions schedule={schedule} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="my-5">
          <TablePagination
            page={params.page ?? 1}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}

      {selectedUser && (
        <ScheduleUserDetailSheet
          user={selectedUser}
          isCreator={isCreator}
          open={userDetailOpen}
          onClose={() => setUserDetailOpen(false)}
        />
      )}
    </>
  );
}
