"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Assignment, Role } from "@/types";
import MyAssignmentDetailSheet from "./my-assignment-detail-sheet";
import MyAssignmentActionDialog from "./my-assignment-action-dialog";

export type MyAssignmentAction = "UPDATE STATUS" | "SUBMIT REPORT" | "UPDATE REPORT" | "ASSIGN" | "UPDATE";

export default function MyAssignmentActions({ role, assignment }: { role: Role, assignment: Assignment }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);

  const [selectedAction, setSelectedAction] =
    useState<MyAssignmentAction | null>(null);

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
          role === "TECHNICIAN" && (assignment.serviceRequest.status === "ASSIGNED" ||
            assignment.serviceRequest.status === "INPROGRESS") && !assignment.serviceRequest.isDeleted &&
          <Button
            size="sm"
            onClick={() => {
              setActionOpen(true);
              setSelectedAction("UPDATE STATUS");
            }
            }
          >
            Update Status
          </Button>
        }

        {
          role === "TECHNICIAN" && (assignment.serviceRequest.status === "INSPECTING" || assignment.serviceRequest.status === "PAYMENTPENDING") && !assignment.serviceRequest.isDeleted &&
          <Button
            size="sm"
            onClick={() => {
              setActionOpen(true);
              if (assignment.technicianReport) {
                setSelectedAction("UPDATE REPORT");
              }
              else {
                setSelectedAction("SUBMIT REPORT");
              }
            }
            }
          >
            {assignment.technicianReport ? "Update Report" : "Submit Report"}
          </Button>
        }

        {
          role !== "TECHNICIAN" && !assignment.serviceRequest.isDeleted &&
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
