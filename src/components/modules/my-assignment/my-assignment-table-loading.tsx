import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MyAssignmentTableLoading() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200/70 hover:bg-transparent">
              <TableHead className="text-center min-w-40">Starting Date & Time</TableHead>
              <TableHead className="text-center min-w-40">Ending Date & Time</TableHead>
              <TableHead className="text-center min-w-60">Created by</TableHead>
              <TableHead className="text-center min-w-10">Reason</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center min-w-30">Feeder</TableHead>
              <TableHead className="text-center">Deleted</TableHead>
              <TableHead className="text-center min-w-60">Deleted by</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
          {[1, 2, 3].map((item) => (
            <TableRow key={item}>
              <TableCell colSpan={9}>
                <Skeleton className="h-7 w-full" />
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  );
}
