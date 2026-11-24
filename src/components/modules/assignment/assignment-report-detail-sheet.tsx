"use client";

import { FieldSeparator } from "@/components/ui/field";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Assignment } from "@/types";

interface Props {
  assignment: Assignment;
  open: boolean;
  onClose: () => void;
}

export default function AssignmentReportDetailSheet({
  assignment,
  open,
  onClose,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="p-3">
        <SheetHeader>

          <SheetTitle className="text-center">
            Technician Report Details
          </SheetTitle>

          <SheetDescription className="text-center">
            View detailed technician report.
          </SheetDescription>

        </SheetHeader>

        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Customer</dt>
            <dd>{assignment.serviceRequest.customer.name}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-muted-foreground">Technician</dt>
            <dd>{assignment.technician?.name || "-"}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-muted-foreground">Status</dt>
            <dd
              className={`rounded-4xl p-1 text-center outline-2 ${assignment.serviceRequest.status === "PENDING"
                ? "outline-stone-500 bg-stone-500/30 text-stone-800"
                : assignment.serviceRequest.status === "ASSIGNED"
                  ? "outline-teal-500 bg-teal-500/30 text-teal-800"
                  : assignment.serviceRequest.status === "INSPECTING"
                    ? "outline-cyan-500 bg-cyan-500/30 text-cyan-800"
                    : assignment.serviceRequest.status === "PAYMENTPENDING"
                      ? "outline-mist-500 bg-mist-500/30 text-mist-800"
                      : assignment.serviceRequest.status === "INPROGRESS"
                        ? "outline-olive-500 bg-olive-500/30 text-olive-800"
                        : assignment.serviceRequest.status === "RESOLVED"
                          ? "outline-emerald-500 bg-emerald-500/30 text-emerald-800"
                          : assignment.serviceRequest.status === "FAILED"
                            ? "outline-mauve-500 bg-mauve-500/30 text-mauve-800"
                            : assignment.serviceRequest.status === "REJECTED"
                              ? "outline-red-400 bg-red-400/30 text-red-700"
                              : "outline-orange-500 bg-orange-500/30 text-orange-800"
                }`}
            >
              {assignment.serviceRequest.status}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-muted-foreground">Reported on</dt>
            <dd>
              {new Date(assignment?.technicianReport?.createdAt as string).toLocaleString(undefined, {
                dateStyle: "full",
              })},&nbsp;
              {new Date(assignment?.technicianReport?.createdAt as string).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-muted-foreground">Last updated</dt>
            <dd>
              {new Date(assignment?.technicianReport?.updatedAt as string).toLocaleString(undefined, {
                dateStyle: "full",
              })},&nbsp;
              {new Date(assignment?.technicianReport?.updatedAt as string).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
            </dd>
          </div>

          {
            assignment.serviceRequest.assignedAt &&
            <>
              <FieldSeparator />
              <div className="space-y-3">

                <p className="text-xs font-semibold tracking-wide uppercase">
                  Assignment
                </p>

                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Assignee notes</dt>
                  <dd>
                    {assignment?.notes}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Assigned at</dt>
                  <dd className="truncate">
                    {new Date(assignment.serviceRequest.assignedAt).toLocaleString(undefined, {
                      dateStyle: "full",
                    })},&nbsp;
                    {new Date(assignment.serviceRequest.assignedAt).toLocaleTimeString(undefined, {
                      timeStyle: "short",
                    })}
                  </dd>
                </div>
              </div>
            </>
          }

          {
            assignment.serviceRequest.inspectedAt &&
            <>
              <FieldSeparator />

              <div className="space-y-3">

                <p className="text-xs font-semibold tracking-wide uppercase">
                  Inspection
                </p>

                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Inspected at</dt>
                  <dd className="truncate">
                    {new Date(assignment.serviceRequest.inspectedAt).toLocaleString(undefined, {
                      dateStyle: "full",
                    })},&nbsp;
                    {new Date(assignment.serviceRequest.inspectedAt).toLocaleTimeString(undefined, {
                      timeStyle: "short",
                    })}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground overflow-auto">Technician diagnosis</dt>
                  <dd className="truncate">
                    {assignment.technicianReport?.diagnosis}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Service charge</dt>
                  <dd className="truncate">
                    ৳&nbsp;{assignment.technicianReport?.charge}
                  </dd>
                </div>

              </div>
            </>
          }

          {
            assignment.serviceRequest.status === "FAILED" &&
            <>
              <FieldSeparator />
              <div className="space-y-3">

                <p className="text-xs font-semibold tracking-wide uppercase">
                  Technician Failure
                </p>

                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Failure notes</dt>
                  <dd>
                    {assignment.serviceRequest.failureNote}
                  </dd>
                </div>

                {
                  assignment.serviceRequest.status === "FAILED" && assignment.payment &&
                  <>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Refunded amount</dt>
                      <dd>
                        {assignment.payment.refundAmount}
                      </dd>
                    </div>

                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Refund reason</dt>
                      <dd>
                        {assignment.payment.refundReason}
                      </dd>
                    </div>

                    {
                      assignment.payment.refundedAt &&
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">Refunded at</dt>
                        <dd className="truncate">
                          {new Date(assignment.payment.refundedAt).toLocaleString(undefined, {
                            dateStyle: "full",
                          })},&nbsp;
                          {new Date(assignment.payment.refundedAt).toLocaleTimeString(undefined, {
                            timeStyle: "short",
                          })}
                        </dd>
                      </div>
                    }
                  </>
                }
              </div>
            </>
          }

          {
            assignment.serviceRequest.status === "RESOLVED" && assignment.serviceRequest.resolvedAt &&
            <>
              <FieldSeparator />
              <div className="space-y-3">

                <p className="text-xs font-semibold tracking-wide uppercase">
                  Successful resolve
                </p>

                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Resolved at</dt>
                  <dd className="truncate">
                    {new Date(assignment.serviceRequest.resolvedAt).toLocaleString(undefined, {
                      dateStyle: "full",
                    })},&nbsp;
                    {new Date(assignment.serviceRequest.resolvedAt).toLocaleTimeString(undefined, {
                      timeStyle: "short",
                    })}
                  </dd>
                </div>

                {
                  assignment?.payment &&
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Paid amount</dt>
                    <dd>
                      {assignment.payment.amount}
                    </dd>
                  </div>
                }
              </div>
            </>
          }

        </dl>

      </SheetContent>
    </Sheet>
  );
}
