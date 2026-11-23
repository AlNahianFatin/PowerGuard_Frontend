"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ServiceRequest, Technician } from "@/types";
import ServiceRequestActionDialog, { type ServiceRequestAction } from "./service-request-action-dialog";

interface Props {
  technicians: Technician[];
  request: ServiceRequest;
}

export default function ServiceRequestActions({
  technicians,
  request,
}: Props) {
  const [selectedAction, setSelectedAction] =
    useState<ServiceRequestAction | null>(null);

  const handleClose = () => {
    setSelectedAction(null);
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedAction("VIEW")}
        >
          View
        </Button>

        {
          request.status === "PENDING" && !request.isDeleted && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setSelectedAction("REJECT")}
            >
              Reject
            </Button>
          )
        }

        {/* {
          !request.isDeleted && (
            <Button
              size="sm"
              onClick={() => setSelectedAction("ASSIGN")}
            >
              {
                request.status === "PENDING" && !request.assignment ?
                  "Assign" :
                  (request.status !== "CANCELLED" || "REJECTED" || "FAILED" || "RESOLVED") && request.assignment ?
                    "Update" : null
              }
            </Button>
          )
        } */}
        {!request.isDeleted &&
          request.status !== "CANCELLED" &&
          request.status !== "REJECTED" &&
          request.status !== "FAILED" &&
          request.status !== "RESOLVED" && (
            <Button
              size="sm"
              onClick={() =>
                setSelectedAction(request.assignment ? "UPDATE" : "ASSIGN")
              }
            >
              {request.assignment ? "Update" : "Assign"}
            </Button>
          )}
      </div>

      <ServiceRequestActionDialog
        action={selectedAction}
        request={request}
        technicians={technicians}
        onClose={handleClose}
      />
    </>
  );
}
