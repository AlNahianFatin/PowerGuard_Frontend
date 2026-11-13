"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TechnicianApprovalTableLoading() {
  return (
    <div className="border rounded-lg">
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
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map((item) => (
            <TableRow key={item}>
              <TableCell colSpan={12}>
                <Skeleton className="h-5 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
