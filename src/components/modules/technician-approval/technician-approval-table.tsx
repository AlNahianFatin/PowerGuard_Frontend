"use client";

import { SearchX } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";

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
import { useSuspenseGetAllTechnicians } from "@/hooks";
import type { Role, Technician, TechnicianParams, User } from "@/types";
import TechnicianApprovalUserDetailSheet from "./technician-approval-user-detail-sheet";

interface Props extends TechnicianParams {
  role?: Role;
  handleReview: Dispatch<SetStateAction<string>>;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function TechnicianApprovalTable({
  role = "OPERATOR",
  handleReview,
  handlePageChange,
  ...params
}: Props) {
  const [userDetailOpen, setUserDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data } = useSuspenseGetAllTechnicians(params);

  const technicians = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const isEmpty = technicians.length === 0;

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setUserDetailOpen(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200/70 hover:bg-transparent">
              <TableHead className="min-w-60 text-center">Name</TableHead>
              <TableHead className="min-w-60 text-center">Email</TableHead>
              <TableHead className="min-w-20 text-center">Address</TableHead>
              <TableHead className="text-center">Availability</TableHead>
              <TableHead className="text-center">Experience (in years)</TableHead>
              <TableHead className="min-w-25 text-center">Contact No.</TableHead>
              <TableHead className="min-w-38 text-center">Applied on</TableHead>
              <TableHead className="text-center">Verification Status</TableHead>
              <TableHead className="min-w-40 text-center">Rejection Reason</TableHead>
              <TableHead className="min-w-60 text-center">Reviewed By</TableHead>
              <TableHead className="min-w-38 text-center">Reviewed on</TableHead>

              {role === "ADMIN" && (
                <TableHead className="text-right">Action</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isEmpty ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={role === "ADMIN" ? 12 : 11}>
                  <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                    <span className="rounded-full bg-muted p-3">
                      <SearchX className="size-5 text-muted-foreground" />
                    </span>

                    <p className="font-medium">No technician found</p>

                    <p className="max-w-sm text-sm text-muted-foreground">
                      {params.searchTerm
                        ? `No results for "${params.searchTerm}". Try a different name or email`
                        : "There are no matching technicians for this category yet"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              technicians.map((technician: Technician) => (
                <TableRow
                  key={technician.id}
                  className="shadow-lg text-center hover:bg-gray-300/30"
                >
                  <TableCell className="max-w-60 overflow-x-auto font-medium">
                    {technician.name}
                  </TableCell>

                  <TableCell className="max-w-60 overflow-x-auto text-muted-foreground">
                    {technician.email}
                  </TableCell>

                  <TableCell className="max-w-55 overflow-x-auto text-muted-foreground">
                    {technician.address || "-"}
                  </TableCell>

                  <TableCell>
                    <div
                      className={`rounded-4xl p-1 text-center outline-2 ${technician.status === "AVAILABLE"
                        ? "outline-emerald-500 bg-emerald-500/30 text-emerald-800"
                        : "outline-red-400 bg-red-400/30 text-red-700"
                        }`}
                    >
                      {technician.status}
                    </div>
                  </TableCell>

                  <TableCell className="text-center text-muted-foreground">
                    {technician.experienceYears}
                  </TableCell>

                  <TableCell className="text-center text-muted-foreground">
                    {technician.contactNumber || "-"}
                  </TableCell>

                  <TableCell className="text-center text-muted-foreground">
                    {new Date(technician.createdAt).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <div
                      className={`rounded-4xl p-1 text-center outline-2 ${technician.verificationStatus === "APPROVED"
                        ? "outline-emerald-500 bg-emerald-500/30 text-emerald-800"
                        : technician.verificationStatus === "REJECTED"
                          ? "outline-red-400 bg-red-400/30 text-red-700"
                          : "outline-amber-500 bg-amber-500/30 text-amber-900"
                        }`}
                    >
                      {technician.verificationStatus}
                    </div>
                  </TableCell>

                  <TableCell className="overflow-auto text-muted-foreground">
                    {technician.rejectionReason || "-"}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {technician.reviewer ? (
                      <Button
                        variant="link"
                        className="h-auto p-0 font-normal text-muted-foreground underline hover:text-primary"
                        onClick={() =>
                          handleUserClick(technician.reviewer as User)
                        }
                      >
                        {technician.reviewer.name}
                      </Button>
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {technician.reviewedAt
                      ? new Date(technician.reviewedAt).toLocaleString()
                      : "-"}
                  </TableCell>

                  {role === "ADMIN" && (
                    <TableCell className="text-right">
                      {technician.user.emailVerified ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReview(technician.id)}
                          disabled={
                            technician.verificationStatus !== "PENDING"
                          }
                        >
                          Review
                        </Button>
                      ) : (
                        <Button disabled variant="outline" size="sm">
                          Not Verified
                        </Button>
                      )}
                    </TableCell>
                  )}
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
        <TechnicianApprovalUserDetailSheet
          user={selectedUser}
          open={userDetailOpen}
          onClose={() => setUserDetailOpen(false)}
        />
      )}
    </>
  );
}
