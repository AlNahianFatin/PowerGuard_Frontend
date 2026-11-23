"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import type { Assignment } from "@/types";
import MyAssignmentDetailSheet from "./my-assignment-detail-sheet";
import MyAssignmentActionDialog from "./my-assignment-action-dialog";

export default function MyAssignmentActions({ assignment }: { assignment: Assignment }) {
  const [detailOpen, setDetailOpen] = useState(false);
  // const [confirmCancel, setConfirmCancel] = useState(false);

  const [updateOpen, setUpdateOpen] = useState(false);
  // const { mutate: updateStatus, isPending: updateStatusPending } = useUpdateStatusTechnician();



  // const { mutate: cancel, isPending: cancelPending } = useCancelRequest();

  // const locked = schedule.status === "PUBLISHED" || schedule.isDeleted;

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setDetailOpen(true)}>
          View
        </Button>

        {
          (assignment.serviceRequest.status === "ASSIGNED" ||
            assignment.serviceRequest.status === "INPROGRESS") && !assignment.serviceRequest.isDeleted &&
          <Button
            size="sm"
            onClick={() => setUpdateOpen(true)}
          >
            Update Status
          </Button>
        }
      </div>

      <MyAssignmentDetailSheet
        assignment={assignment}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />

      <MyAssignmentActionDialog
        assignment={assignment}
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
      />
    </>
  );
}
