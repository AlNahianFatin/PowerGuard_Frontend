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
import type { Technician, TechnicianParams } from "@/types";
import Link from "next/link";

interface Props extends TechnicianParams {
  handleReview: Dispatch<SetStateAction<string>>;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function TechnicianApprovalTable({
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
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Experience (in years)</TableHead>
              <TableHead>Contact No.</TableHead>
              <TableHead>Applied on</TableHead>
              <TableHead>Verification Status</TableHead>
              <TableHead>Rejection Reason</TableHead>
              <TableHead>Reviewed By</TableHead>
              <TableHead>Reviewed on</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isEmpty ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6}>
                  <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                    <span className="rounded-full bg-muted p-3">
                      <SearchX className="size-5 text-muted-foreground" />
                    </span>
                    <p className="font-medium">No technician found</p>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      {params.searchTerm
                        ? `No results for "${params.searchTerm}". Try a different name or email`
                        : "There are no matching technician in this view yet"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              technicians.map((technician: Technician) => (
                <TableRow key={technician.id}>
                  <TableCell className="font-medium">{technician.name}</TableCell>
                  {/* <TableCell className="font-mono text-xs">
                    {technician.email}
                  </TableCell> */}

                  <TableCell
                    className="max-w-55 truncate text-muted-foreground"
                    title={technician.email}
                  >
                    {technician.email}
                  </TableCell>

                  <TableCell
                    className="max-w-55 truncate text-muted-foreground"
                    title={technician.address}
                  >
                    {technician.address}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {technician.status}
                  </TableCell>

                  <TableCell>{technician.experienceYears}</TableCell>

                  <TableCell>{technician.contactNumber ?? "-"}</TableCell>

                  <TableCell className={
                    technician.verificationStatus === "APPROVED" ?
                      "bg-green-500" :
                      technician.verificationStatus === "REJECTED" ?
                        "bg-red-500" :
                        "bg-yellow-500"
                  }>
                    {technician.verificationStatus}
                  </TableCell>

                  <TableCell>
                    {technician.rejectionReason ?? "-"}
                  </TableCell>

                  <TableCell>
                    {technician.reviewer ?
                      <Link href={"/"}>technician.reviewer.name</Link> : "-"}
                  </TableCell>
                  <TableCell>
                    {technician.reviewedAt ?? "-"}
                  </TableCell>

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
