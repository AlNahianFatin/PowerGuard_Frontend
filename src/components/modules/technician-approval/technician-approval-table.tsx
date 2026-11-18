import { SearchX } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
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
import type { Role, Technician, TechnicianParams } from "@/types";
import Link from "next/link";

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
  const { data } = useSuspenseGetAllTechnicians(params);

  const technicians = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const isEmpty = technicians.length === 0;

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200/70 hover:bg-transparent">
              <TableHead className="text-center min-w-60">Name</TableHead>
              <TableHead className="text-center min-w-60">Email</TableHead>
              <TableHead className="text-center min-w-20">Address</TableHead>
              <TableHead className="text-center">Availability</TableHead>
              <TableHead className="text-center">Experience (in years)</TableHead>
              <TableHead className="text-center min-w-25">Contact No.</TableHead>
              <TableHead className="text-center min-w-38">Applied on</TableHead>
              <TableHead className="text-center">Verification Status</TableHead>
              <TableHead className="text-center min-w-40">Rejection Reason</TableHead>
              <TableHead className="text-center min-w-60">Reviewed By</TableHead>
              <TableHead className="text-center min-w-38">Reviewed on</TableHead>
              {
                role === "ADMIN" &&
                <TableHead className="text-right">Action</TableHead>
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {isEmpty ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={60}>
                  <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                    <span className="rounded-full bg-muted p-3">
                      <SearchX className="size-5 text-muted-foreground" />
                    </span>
                    <p className="font-medium">No technician found</p>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      {params.searchTerm
                        ? `No results for "${params.searchTerm}". Try a different name or email`
                        : "There are no matching technician for this category yet"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              technicians.map((technician: Technician) => (
                <TableRow key={technician.id} className="hover:bg-gray-300/30 shadow-lg text-center">

                  <TableCell className="font-medium max-w-60 overflow-x-auto">
                    <Link href={"/"} className="hover:text-primary underline">{technician.name}</Link>
                  </TableCell>

                  {/* <TableCell className="text-muted-foreground">
                    {technician.reviewer ?
                      <Link href={"/"} className="hover:text-primary underline">{technician.reviewer.name}</Link> : "-"}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReview(technician.id)}
                      disabled={technician.verificationStatus !== "PENDING"}
                    >
                      Review
                    </Button>
                  </TableCell> */}
                  <TableCell className="max-w-60 overflow-x-auto text-muted-foreground">
                    {technician.email}
                  </TableCell>

                  <TableCell className="max-w-55 overflow-x-auto text-muted-foreground">
                    {technician.address || "-"}
                  </TableCell>

                  <TableCell>
                    <div className={`outline-2 text-center rounded-4xl p-1
                    ${technician.status === "AVAILABLE" ?
                        "outline-emerald-500 text-emerald-800 bg-emerald-500/30" :
                        "outline-red-400 text-red-700 bg-red-400/30"
                      }`
                    }>
                      {technician.status}
                    </div>
                  </TableCell>

                  <TableCell className="text-center text-muted-foreground">
                    {technician.experienceYears}
                  </TableCell>

                  <TableCell className="text-center text-muted-foreground">
                    {technician.contactNumber ?? "-"}
                  </TableCell>

                  <TableCell className="text-center text-muted-foreground">
                    {new Date(technician.createdAt).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <div className={`outline-2 text-center rounded-4xl p-1
                    ${technician.verificationStatus === "APPROVED" ?
                        "outline-emerald-500 text-emerald-800 bg-emerald-500/30" :
                        technician.verificationStatus === "REJECTED" ?
                          "outline-red-400 text-red-700 bg-red-400/30" :
                          "outline-amber-500 text-amber-900 bg-amber-500/30"
                      }`
                    }>{technician.verificationStatus}
                    </div>
                  </TableCell>

                  <TableCell className="text-muted-foreground overflow-auto">
                    {technician.rejectionReason ?? "-"}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {technician.reviewer ?
                      <Link href={"/"} className="hover:text-primary underline">{technician.reviewer.name}</Link> : "-"}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {technician.reviewedAt ?
                      new Date(technician.reviewedAt).toLocaleString() :
                      "-"
                    }
                  </TableCell>

                  {
                    role === "ADMIN" && (
                      <TableCell className="text-right" >
                        {
                          technician.user.emailVerified ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReview(technician.id)}
                              disabled={technician.verificationStatus !== "PENDING"}
                            >
                              Review
                            </Button>
                          ) : (
                            <Button disabled variant="outline" size="sm">
                              Not Verified
                            </Button>
                          )
                        }
                      </TableCell>
                    )
                  }
                </TableRow>
              ))
            )}
          </TableBody>
        </Table >
      </div >
      {totalPages > 1 && (
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
