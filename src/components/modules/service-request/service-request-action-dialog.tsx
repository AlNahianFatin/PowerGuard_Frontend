"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ServiceRequest, Technician } from "@/types";
import ServiceRequestDetailSheet from "./service-request-detail-sheet";
import AssignTechnicianForm from "@/components/form/assign-technician-form";
import RejectServiceRequestForm from "@/components/form/reject-service-request-form";

export type ServiceRequestAction = "VIEW" | "REJECT" | "ASSIGN" | "UPDATE";

interface Props {
  action: ServiceRequestAction | null;
  request: ServiceRequest;
  // technicians: Technician[];
  onClose: () => void;
}

export default function ServiceRequestActionDialog({
  action,
  request,
  onClose,
}: Props) {
  const isDialogOpen = action === "REJECT" || action === "ASSIGN" || action === "UPDATE";

  return (
    <>
      <ServiceRequestDetailSheet
        request={request}
        open={action === "VIEW"}
        onClose={onClose}
      />

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {
                action === "REJECT"
                  ? "Reject Service Request"
                  : action === "ASSIGN"
                    ? "Assign Technician"
                    : action === "UPDATE"
                      ? "Update Assignment"
                      : ""
              }
            </DialogTitle>

            <DialogDescription>
              {
                action === "REJECT"
                  ? "Provide a reason for rejecting this service request."
                  : action === "ASSIGN"
                    ? "Select a technician and provide optional assignment notes."
                    : action === "UPDATE"
                      ? "Update notes for the technician."
                      : ""
              }
            </DialogDescription>
          </DialogHeader>

          {
            action === "REJECT" && (
              <RejectServiceRequestForm
                requestId={request.id}
                handleClose={onClose}
              />
            )
          }

          {
            (action === "ASSIGN" || action === "UPDATE") && (
              <AssignTechnicianForm
                key={`${action}-${request.id}`}
                action={action}
                request={request}
                handleClose={onClose}
              />
            )
          }
        </DialogContent>
      </Dialog>
    </>
  );
}
