"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useAssignTechnician } from "@/hooks";
import type { ServiceRequest, Technician } from "@/types";
import ServiceRequestDetailSheet from "./service-request-detail-sheet";
import AssignTechnicianForm from "@/components/form/assign-technician-form";
import RejectServiceRequestForm from "@/components/form/reject-service-request-form";
// import MyServiceRequestDetailSheet from "./my-service-request-detail-sheet";

export default function ServiceRequestActions({ technicians, request }: { technicians: Technician[], request: ServiceRequest }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);



  return (
    <>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setDetailOpen(true)}>
          View
        </Button>

        {
          request.status === "PENDING" && !request.isDeleted && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setRejectOpen(true)}
            >
              Reject
            </Button>
          )
        }

        {
          request.status === "PENDING" && !request.isDeleted && (
            <Button
              size="sm"
              onClick={() => setAssignOpen(true)}
            >
              {
                request.assignment ? "Assign" : "Update"
              }
            </Button>
          )
        }

        {/* {!locked && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setConfirmCancel(true)}
          >
            Cancel
          </Button>
        )} */}
      </div>

      <ServiceRequestDetailSheet
        request={request}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />

      <AssignTechnicianForm
        requestId={request.id}
        technicians={technicians}
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
      />

      <RejectServiceRequestForm
        requestId={request.id}
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
      />
    </>
  );
}
