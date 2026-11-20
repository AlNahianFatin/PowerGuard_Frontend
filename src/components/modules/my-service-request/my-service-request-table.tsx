"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { SearchX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import { useSuspenseGetMyServiceRequest } from "@/hooks";
import type { ServiceRequestParams, User } from "@/types";
// import ScheduleUserDetailSheet from "./schedule-user-detail-sheet";
import MyServiceRequestActions from "./my-service-request-actions";

interface Props extends ServiceRequestParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function MyServiceRequestTable({
  handlePageChange,
  ...params
}: Props) {
  const [userDetailOpen, setUserDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreator, setIsCreator] = useState(false);

  const { data } = useSuspenseGetMyServiceRequest(params);

  const requests = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const isEmpty = requests.length === 0;

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
                Title
              </TableHead>
              <TableHead className="min-w-38 text-center">
                Description
              </TableHead>
              <TableHead className="text-center">
                Status
              </TableHead>
              <TableHead className="min-w-10 text-center">
                Requested on
              </TableHead>
              <TableHead className="min-w-30 text-center">
                Last updated
              </TableHead>
              <TableHead className="text-center">
                Area
              </TableHead>
              <TableHead className="min-w-60 text-center">
                Assigned technician
              </TableHead>
              <TableHead className="text-right">
                Action
              </TableHead>
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

                    <p className="font-medium">No service request found</p>

                    <p className="max-w-sm text-sm text-muted-foreground">
                      {params.searchTerm
                        ? `No results for "${params.searchTerm}". Try a different keyword`
                        : "There are no matching service requests for this category yet"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow
                  key={request.id}
                  className="shadow-lg text-center text-muted-foreground hover:bg-gray-300/30"
                >
                  <TableCell>
                    {request.title}
                  </TableCell>

                  <TableCell>
                    {request.description}
                  </TableCell>

                  <TableCell className="max-w-60 overflow-x-auto">
                    <div
                      className={`rounded-4xl p-1 text-center outline-2 ${request.status === "PENDING"
                        ? "outline-stone-500 bg-stone-500/30 text-stone-800"
                        : request.status === "ASSIGNED"
                          ? "outline-teal-500 bg-teal-500/30 text-teal-800"
                          : request.status === "INSPECTING"
                            ? "outline-cyan-500 bg-cyan-500/30 text-cyan-800"
                            : request.status === "PAYMENTPENDING"
                              ? "outline-mist-500 bg-mist-500/30 text-mist-800"
                              : request.status === "INPROGRESS"
                                ? "outline-olive-500 bg-olive-500/30 text-olive-800"
                                : request.status === "RESOLVED"
                                  ? "outline-emerald-500 bg-emerald-500/30 text-emerald-800"
                                  : request.status === "FAILED"
                                    ? "outline-mauve-500 bg-mauve-500/30 text-mauve-800"
                                    : request.status === "REJECTED"
                                      ? "outline-red-400 bg-red-400/30 text-red-700"
                                      : "outline-orange-500 bg-orange-500/30 text-orange-800"
                        }`}
                    >
                      {request.status}
                    </div>
                    {/* <Button
                      variant="link"
                      className="h-auto p-0 font-normal text-muted-foreground underline hover:text-primary"
                      onClick={() =>
                        handleUserClick(schedule.createdByUser, true)
                      }
                    >
                      {schedule.createdByUser.name}
                    </Button> */}
                  </TableCell>

                  <TableCell className="max-w-60 overflow-x-auto">
                    {new Date(request.createdAt).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {new Date(request.updatedAt).toLocaleString()}
                  </TableCell>

                  <TableCell>{request.area.name}</TableCell>

                  <TableCell>{request.assignment?.technician?.name || "-"}</TableCell>

                  <TableCell className="text-right">
                    <MyServiceRequestActions request={request} />
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

      {/* {selectedUser && (
        <ScheduleUserDetailSheet
          user={selectedUser}
          isCreator={isCreator}
          open={userDetailOpen}
          onClose={() => setUserDetailOpen(false)}
        />
      )} */}
    </>
  );
}
