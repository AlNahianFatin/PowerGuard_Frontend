"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toast, toast } from "@/components/ui/toast";
import { useCancelRequest } from "@/hooks";
import type { ServiceRequest } from "@/types";
import MyServiceRequestDetailSheet from "./my-service-request-detail-sheet";
import { usePayServiceRequest } from "@/hooks/payment.hook";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BookingConfirmation {
  request: ServiceRequest;
  paymentUrl: string;
}

export default function MyServiceRequestActions({ request }: { request: ServiceRequest }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const { mutate: cancel, isPending: cancelPending } = useCancelRequest();

  const { mutate: pay, isPending: payPending } = usePayServiceRequest();
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null,
  );

  const handlePayNow = (request: ServiceRequest) => {
    // const payload: PayServiceRequestPayload = { requestId: request.id };
    // const result = await payServiceRequest(payload);
    // console.log(result)
    // const paymentUrl = result;

    // router.push(`${paymentUrl}`);

    pay(
      { requestId: request.id },
      {
        onSuccess: (res) => {
          setConfirmation({ paymentUrl: res.data.paymentUrl, request });
        },
        onError: (err: any) => {
          toast.add({
            title: "Authorization failure",
            description:
              err.data?.message ||
              "Something went wrong. Please try again",
            type: "error",
          });
        },
      },
    );
  }

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

        {(request.status === "PAYMENTPENDING") && (
          <Button
            size="sm"
            onClick={() => handlePayNow(request)}>
            {payPending ? "Paying..." : "Pay"}
          </Button>
        )}
      </div>

      <Dialog
        open={!!confirmation}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmation(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment in Progress</DialogTitle>
            <DialogDescription>
              Please pay within 10 minutes to resume servicing.
            </DialogDescription>
            {/* <span>
              Data and Time:
              {confirmation
                ? format(new Date(), "PPP")
                : "-"}
            </span> */}
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmation(null)}>
              Pay Later
            </Button>
            <Button
              onClick={() => {
                if (confirmation) {
                  window.location.href = confirmation.paymentUrl;
                }
              }}
            >
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MyServiceRequestDetailSheet
        request={request}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
}
