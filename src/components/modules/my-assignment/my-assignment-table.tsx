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
import { useSuspenseGetMyAssignment } from "@/hooks";
import type { Customer, MyAssignmentParams, Role, Technician, User } from "@/types";
import { Button } from "@/components/ui/button";
import MyAssignmentUserDetailSheet from "./my-assignment-user-detail-sheet";
import MyAssignmentActions from "./my-assignment-actions";

interface Props extends MyAssignmentParams {
  role: Role;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function MyAssignmentTable({
  role,
  handlePageChange,
  ...params
}: Props) {
  const [selectedUser, setSelectedUser] = useState<Technician | Customer | User | null>(null);
  const [userDetailOpen, setUserDetailOpen] = useState(false);

  const [isCustomer, setIsCustomer] = useState(false);
  const [isTechnician, setIsTechnician] = useState(false);

  const [reportDetailOpen, setReportDetailOpen] = useState(false);

  const { data } = useSuspenseGetMyAssignment(params);

  const assignments = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const isEmpty = assignments.length === 0;

  const handleCustomerClick = (user: Customer) => {
    setIsCustomer(true);
    setIsTechnician(false);
    setSelectedUser(user);
    setUserDetailOpen(true);
  };

  const handleAssigneeClick = (user: User) => {
    setIsCustomer(false);
    setIsTechnician(false);
    setSelectedUser(user);
    setUserDetailOpen(true);
  };

  const handleTechnicianClick = (user: Technician) => {
    setIsCustomer(false);
    setIsTechnician(true);
    setSelectedUser(user);
    setUserDetailOpen(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200/70 hover:bg-transparent">
              <TableHead className="min-w-38 text-center">
                Customer
              </TableHead>
              <TableHead className="min-w-38 text-center">
                Service Request Title
              </TableHead>
              {
                role === "TECHNICIAN" &&
                <TableHead className="min-w-30 text-center">
                  Assignee
                </TableHead>
              }
              {
                role === "TECHNICIAN" ?
                  <TableHead className="min-w-30 text-center">
                    Assignee Notes
                  </TableHead> :
                  <TableHead className="min-w-30 text-center">
                    Your Notes
                  </TableHead>
              }
              {
                role !== "TECHNICIAN" &&
                <TableHead className="min-w-30 text-center">
                  Technician
                </TableHead>
              }
              <TableHead className="min-w-30 text-center">
                Assigned on
              </TableHead>
              <TableHead className="text-center">
                Area
              </TableHead>
              <TableHead className="min-w-10 text-center">
                Feeder
              </TableHead>
              {
                role === "TECHNICIAN" ?
                  <TableHead className="min-w-60 text-center">
                    Your Report
                  </TableHead> :
                  <TableHead className="min-w-60 text-center">
                    Technician Report
                  </TableHead>
              }
              <TableHead className="text-center">
                Status
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

                    <p className="font-medium">No assignment found</p>

                    <p className="max-w-sm text-sm text-muted-foreground">
                      {params.searchTerm
                        ? `No results for "${params.searchTerm}". Try a different keyword`
                        : "There are no matching service requests for this category yet"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              assignments.map((assignment) => (
                <TableRow
                  key={assignment.id}
                  className="shadow-lg text-center text-muted-foreground hover:bg-gray-300/30"
                >

                  <TableCell>
                    <Button
                      variant="link"
                      className="h-auto p-0 font-normal text-muted-foreground underline hover:text-primary"
                      onClick={() =>
                        handleCustomerClick(assignment.serviceRequest.customer)
                      }
                    >
                      {assignment.serviceRequest.customer.name}
                    </Button>

                  </TableCell>
                  <TableCell>
                    {assignment.serviceRequest.title}
                  </TableCell>

                  {
                    role === "TECHNICIAN" &&
                    <TableCell>
                      <Button
                        variant="link"
                        className="h-auto p-0 font-normal text-muted-foreground underline hover:text-primary"
                        onClick={() =>
                          handleAssigneeClick(assignment.assignedByUser)
                        }
                      >
                        {assignment.assignedByUser.name}
                      </Button>
                    </TableCell>
                  }

                  <TableCell>
                    {assignment.notes || "-"}
                  </TableCell>

                  {
                    role !== "TECHNICIAN" && assignment.technician &&
                    <TableCell>
                      <Button
                        variant="link"
                        className="h-auto p-0 font-normal text-muted-foreground underline hover:text-primary"
                        onClick={() =>
                          // biome-ignore lint/style/noNonNullAssertion: <sdf>
                          handleTechnicianClick(assignment.technician!)
                        }
                      >
                        {assignment.technician.name}
                      </Button>
                    </TableCell>
                  }

                  <TableCell>
                    {new Date(assignment.createdAt).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {assignment.serviceRequest.area.name}
                  </TableCell>

                  <TableCell>
                    {assignment.serviceRequest.area.feeder.name}
                  </TableCell>

                  <TableCell>
                    {
                      assignment.technicianReport ?
                        <Button
                          variant="link"
                          className="h-auto p-0 font-normal text-muted-foreground underline hover:text-primary"
                          onClick={() => setReportDetailOpen(true)}
                        >
                          "View report"
                        </Button> :
                        "-"
                    }
                  </TableCell>

                  <TableCell className="max-w-60 overflow-x-auto">
                    <div
                      className={`rounded-4xl py-1 px-2 text-center outline-2 ${assignment.serviceRequest.status === "PENDING"
                        ? "outline-stone-500 bg-stone-500/30 text-stone-800"
                        : assignment.serviceRequest.status === "ASSIGNED"
                          ? "outline-teal-500 bg-teal-500/30 text-teal-800"
                          : assignment.serviceRequest.status === "INSPECTING"
                            ? "outline-cyan-500 bg-cyan-500/30 text-cyan-800"
                            : assignment.serviceRequest.status === "PAYMENTPENDING"
                              ? "outline-mist-500 bg-mist-500/30 text-mist-800"
                              : assignment.serviceRequest.status === "INPROGRESS"
                                ? "outline-olive-500 bg-olive-500/30 text-olive-800"
                                : assignment.serviceRequest.status === "RESOLVED"
                                  ? "outline-emerald-500 bg-emerald-500/30 text-emerald-800"
                                  : assignment.serviceRequest.status === "FAILED"
                                    ? "outline-mauve-500 bg-mauve-500/30 text-mauve-800"
                                    : assignment.serviceRequest.status === "REJECTED"
                                      ? "outline-red-400 bg-red-400/30 text-red-700"
                                      : "outline-orange-500 bg-orange-500/30 text-orange-800"
                        }`}
                    >
                      {assignment.serviceRequest.status}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <MyAssignmentActions role={role} assignment={assignment} />
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
        <MyAssignmentUserDetailSheet
          isCustomer={isCustomer}
          isTechnician={isTechnician}
          user={selectedUser}
          open={userDetailOpen}
          onClose={() => setUserDetailOpen(false)}
        />
      )}
    </>
  );
}
