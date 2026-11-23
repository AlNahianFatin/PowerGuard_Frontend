"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Assignment, ServiceRequest } from "@/types";
import AssignTechnicianForm from "@/components/form/assign-technician-form";
import UpdateAssignmentStatusForm from "@/components/form/update-assignment-status-form";
import type { MyAssignmentAction } from "./my-assignment-actions";
import SubmitTechnicianReportForm from "@/components/form/submit-technician-report-form";

interface Props {
  action: MyAssignmentAction | null;
  assignment: Assignment;
  open: boolean;
  onClose: () => void;
}

export default function MyAssignmentActionDialog({
  action,
  assignment,
  open,
  onClose,
}: Props) {
  const request: ServiceRequest = {
    ...assignment.serviceRequest,
    assignment: {
      ...assignment
    },
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {
              action === "UPDATE STATUS"
                ? "Update Assignment Status"
                : action === "SUBMIT REPORT"
                  ? "Submit Report"
                  : action === "UPDATE REPORT"
                    ? "Update Report"
                    : action === "ASSIGN"
                      ? "Assign Technician"
                      : action === "UPDATE"
                        ? "Update Assignment"
                        : ""
            }
          </DialogTitle>
          <DialogDescription>
            {
              action === "UPDATE STATUS"
                ? "Update status of the assignment."
                : action === "SUBMIT REPORT"
                  ? "Provide your diagnosis report and charge fee after inspection."
                  : action === "UPDATE REPORT"
                    ? "Update your diagnosis report and charge fee after inspection."
                    : action === "ASSIGN"
                      ? "Select a technician and provide optional assignment notes."
                      : action === "UPDATE"
                        ? "Update notes for the technician."
                        : ""
            }
          </DialogDescription>
        </DialogHeader>

        {
          action === "UPDATE STATUS" &&
          <UpdateAssignmentStatusForm
            assignment={assignment}
            handleClose={onClose}
          />

        }

        {
          (action === "SUBMIT REPORT" || action === "UPDATE REPORT") &&
          <SubmitTechnicianReportForm
            key={`${action}-${assignment.technicianReport?.id}`}
            action={action}
            assignment={assignment}
            handleClose={onClose}
          />

        }

        {
          (action === "UPDATE") && (
            <AssignTechnicianForm
              key={`${action}-${assignment.serviceRequest.id}`}
              action={action}
              request={request}
              handleClose={onClose}
            />
          )
        }

      </DialogContent>
    </Dialog>
  );
}
