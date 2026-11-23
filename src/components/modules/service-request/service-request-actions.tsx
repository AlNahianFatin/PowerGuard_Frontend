"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ServiceRequest } from "@/types";
import ServiceRequestActionDialog, { type ServiceRequestAction } from "./service-request-action-dialog";

interface Props {
  request: ServiceRequest;
}

export default function ServiceRequestActions({
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
        onClose={handleClose}
      />
    </>
  );
}
