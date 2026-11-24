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
import type { AssignmentAction } from "./assignment-actions";

interface Props {
  action: AssignmentAction | null;
  assignment: Assignment;
  open: boolean;
  onClose: () => void;
}

export default function AssignmentActionDialog({
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
              action === "ASSIGN"
                ? "Assign Technician"
                : action === "UPDATE"
                  ? "Update Assignment"
                  : ""
            }
          </DialogTitle>
          <DialogDescription>
            {
              action === "ASSIGN"
                ? "Select a technician and provide optional assignment notes."
                : action === "UPDATE"
                  ? "Update notes for the technician."
                  : ""
            }
          </DialogDescription>
        </DialogHeader>

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
