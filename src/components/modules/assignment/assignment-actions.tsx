"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Assignment } from "@/types";
import MyAssignmentDetailSheet from "./assignment-detail-sheet";
import MyAssignmentActionDialog from "./assignment-action-dialog";

export type AssignmentAction = "ASSIGN" | "UPDATE";

export default function AssignmentActions({ assignment }: { assignment: Assignment }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);

  const [selectedAction, setSelectedAction] =
    useState<AssignmentAction | null>(null);

  const handleClose = () => {
    setActionOpen(false);
    setSelectedAction(null);
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setDetailOpen(true)}>
          View
        </Button>

        {
          !assignment.serviceRequest.isDeleted &&
          assignment.serviceRequest.status !== "CANCELLED" &&
          assignment.serviceRequest.status !== "REJECTED" &&
          assignment.serviceRequest.status !== "FAILED" &&
          assignment.serviceRequest.status !== "RESOLVED" && (
            <Button
              size="sm"
              onClick={() => {
                setActionOpen(true);
                setSelectedAction("UPDATE");
              }
              }
            >
              Update
            </Button>
          )
        }
      </div>

      <MyAssignmentDetailSheet
        assignment={assignment}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />

      <MyAssignmentActionDialog
        action={selectedAction}
        assignment={assignment}
        open={actionOpen}
        onClose={handleClose}
      />
    </>
  );
}
