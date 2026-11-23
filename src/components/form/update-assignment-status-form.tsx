"use client";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { useUpdateStatusTechnician } from "@/hooks";
import {
  ServiceRequestStatus,
  UpdateAssignmentStatusSchema,
} from "@/validation";
import type z from "zod";
import type { Assignment } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  assignment: Assignment;
  handleClose: () => void;
}

type UpdateStatusDefaultValues = z.infer<
  typeof UpdateAssignmentStatusSchema
>;

export default function UpdateAssignmentStatusForm({
  assignment,
  handleClose,
}: Props) {
  const { mutate: updateStatus, isPending } =
    useUpdateStatusTechnician();

  const currentStatus = assignment.serviceRequest.status;

  const availableStatus =
    currentStatus === ServiceRequestStatus.ASSIGNED
      ? [
        {
          title: "Inspecting",
          value: ServiceRequestStatus.INSPECTING,
        },
      ]
      : currentStatus === ServiceRequestStatus.INPROGRESS
        ? [
          {
            title: "Resolved",
            value: ServiceRequestStatus.RESOLVED,
          },
          {
            title: "Failed",
            value: ServiceRequestStatus.FAILED,
          },
        ]
        : [];

  const defaultValues: UpdateStatusDefaultValues = {
    status: "",
    failureNote: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: UpdateAssignmentStatusSchema,
      onSubmit: UpdateAssignmentStatusSchema,
    },
    onSubmit: ({ value }) => {
      updateStatus(
        {
          assignmentId: assignment.id,
          payload: {
            status: value.status,
            failureNote:
              value.status === ServiceRequestStatus.FAILED
                ? value.failureNote
                : "",
          },
        },
        {
          // biome-ignore lint/suspicious/noExplicitAny: <sd>
          onSuccess: (res: any) => {
            if (!res.success) {
              toast.add({
                title: "Server Failure",
                description:
                  res.data?.message ||
                  res.message ||
                  "Something went wrong. Please try again",
                type: "error",
              });
              return;
            }

            toast.add({
              title: "Status Updated",
              description:
                res.message || "Assignment status updated successfully",
              type: "success",
            });

            handleClose();
          },
          // biome-ignore lint/suspicious/noExplicitAny: API error response
          onError: (err: any) => {
            toast.add({
              title: "Status update failed",
              description:
                err.data?.message ||
                "Something went wrong. Please try again",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
      className="min-w-fit"
    >
      <FieldGroup>
        <form.Field name="status">
          {(field) => {
            const isInvalid =
              field.state.meta.errors.length > 0;

            const selectedStatus = availableStatus.find(
              (status) => status.value === field.state.value,
            );

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Status</FieldLabel>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between"
                        aria-invalid={isInvalid}
                      >
                        {selectedStatus?.title ?? "Select status"}
                      </Button>
                    }
                  />

                  <DropdownMenuContent
                    align="start"
                    className="w-(--anchor-width)"
                  >
                    {availableStatus.map((status) => (
                      <DropdownMenuItem
                        key={status.value}
                        onClick={() => {
                          field.handleChange(
                            status.value as UpdateStatusDefaultValues["status"],
                          );
                          field.handleBlur();
                        }}
                      >
                        {status.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe
          selector={(state) => state.values.status}
        >
          {(status) =>
            status === ServiceRequestStatus.FAILED && (
              <form.Field name="failureNote">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Failure Reason
                      </FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="Enter the reason for failure"
                        value={field.state.value ?? ""}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                      />

                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            )
          }
        </form.Subscribe>

        <Button
          type="submit"
          disabled={isPending || availableStatus.length === 0}
        >
          {isPending ? (
            <>
              <Spinner />
              Updating...
            </>
          ) : (
            "Update Status"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
