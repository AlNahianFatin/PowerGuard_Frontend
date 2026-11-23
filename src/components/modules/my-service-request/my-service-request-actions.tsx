"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useCancelRequest } from "@/hooks";
import type { ServiceRequest } from "@/types";
import MyServiceRequestDetailSheet from "./my-service-request-detail-sheet";

export default function MyServiceRequestActions({ request }: { request: ServiceRequest }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const { mutate: cancel, isPending: cancelPending } = useCancelRequest();

  const handleCancel = () => {
    cancel(
      {
        requestId: request.id
      }, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: res.data?.message || res.message || "Something went wrong. Please try again",
            type: "error",
          });
          return;

        }
        toast.add({
          title: "Service request cancelled",
          description: res.message || "Service request cancelled successfully",
          type: "success",
        });

        setConfirmCancel(false);
      },

      // biome-ignore lint/suspicious/noExplicitAny: <dfg>
      onError: (err: any) => {
        toast.add({
          title: "Cancellation failed",
          description: err.data?.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };

  if (confirmCancel) {
    return (
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirmCancel(false)}
        >
          Cancel
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={handleCancel}
          disabled={cancelPending}
        >
          Confirm
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setDetailOpen(true)}>
          View
        </Button>

        {(request.status === "PENDING" || request.status === "ASSIGNED") && !request.isDeleted && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setConfirmCancel(true)}
          >
            Cancel
          </Button>
        )}
      </div>

      <MyServiceRequestDetailSheet
        request={request}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
}
