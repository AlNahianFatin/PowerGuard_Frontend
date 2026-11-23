"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Assignment, ServiceRequest, Technician } from "@/types";
// import ServiceRequestDetailSheet from "./service-request-detail-sheet";
import AssignTechnicianForm from "@/components/form/assign-technician-form";
import RejectServiceRequestForm from "@/components/form/reject-service-request-form";
import UpdateAssignmentStatusForm from "@/components/form/update-assignment-status-form";

// export type ServiceRequestAction = "VIEW" | "REJECT" | "ASSIGN" | "UPDATE";

interface Props {
  assignment: Assignment;
  open: boolean;
  onClose: () => void;
}

export default function MyAssignmentActionDialog({
  assignment,
  open,
  onClose,
}: Props) {
  // const isDialogOpen = action === "REJECT" || action === "ASSIGN" || action === "UPDATE";

  return (
    <>
      {/* <ServiceRequestDetailSheet
        request={request}
        open={action === "VIEW"}
        onClose={onClose}
      /> */}

      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Update Assignment
            </DialogTitle>
            <DialogDescription>
              Update the assignment status
            </DialogDescription>
          </DialogHeader>


          <UpdateAssignmentStatusForm
            assignment={assignment}
            handleClose={onClose}
          />

        </DialogContent>
      </Dialog>
    </>
  );
}
