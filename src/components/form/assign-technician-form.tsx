"use client";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { useAssignTechnician, useUpdateTechnician } from "@/hooks";
import {
  AssignTechnicianSchema,
  UpdateAssignmentSchema,
} from "@/validation";
import type { ServiceRequest, Technician } from "@/types";
import TechnicianSelector from "../modules/technician/technician-selector-table";

interface Props {
  action: "ASSIGN" | "UPDATE";
  request: ServiceRequest;
  technicians: Technician[];
  handleClose: () => void;
}

type FormValues = {
  technicianId: string;
  notes?: string;
};

export default function AssignTechnicianForm({
  action,
  request,
  technicians,
  handleClose,
}: Props) {
  const { mutate: assign, isPending: isAssignPending } = useAssignTechnician();
  const { mutate: update, isPending: isUpdatePending } = useUpdateTechnician();

  const isAssign = action === "ASSIGN";

  const defaultValues: FormValues = {
    technicianId: "",
    notes: request.assignment?.notes ?? "",
  };

  const validate = (value: FormValues) => {
    const result = isAssign
      ? AssignTechnicianSchema.safeParse(value)
      : UpdateAssignmentSchema.safeParse(value);

    return result.success ? undefined : result.error;
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: ({ value }) => validate(value),
      onSubmit: ({ value }) => validate(value),
    },
    onSubmit: ({ value }) => {
      if (isAssign) {
        assign(
          {
            requestId: request.id,
            payload: {
              technicianId: value.technicianId,
              notes: value.notes,
            },
          },
          {
            // biome-ignore lint/suspicious/noExplicitAny: <df>
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
                title: isAssign
                  ? "Assignment successful"
                  : "Assignment updated",
                description:
                  res.message ||
                  (isAssign
                    ? "Technician assigned successfully"
                    : "Assignment updated successfully"),
                type: "success",
              });

              handleClose();
            },

            // biome-ignore lint/suspicious/noExplicitAny: <gh>
            onError: (err: any) => {
              toast.add({
                title: isAssign
                  ? "Assignment failed"
                  : "Assignment update failed",
                description:
                  err.data?.message || "Something went wrong. Please try again",
                type: "error",
              });
            },
          },
        );
      }
      else {
        update(
          {
            assignmentId: request.assignment?.id as string,
            payload: {
              technicianId: value.technicianId,
              notes: value.notes,
            },
          },
          {
            // biome-ignore lint/suspicious/noExplicitAny: <df>
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
                title: isAssign
                  ? "Assignment successful"
                  : "Assignment updated",
                description:
                  res.message ||
                  (isAssign
                    ? "Technician assigned successfully"
                    : "Assignment updated successfully"),
                type: "success",
              });

              handleClose();
            },

            // biome-ignore lint/suspicious/noExplicitAny: <gh>
            onError: (err: any) => {
              toast.add({
                title: isAssign
                  ? "Assignment failed"
                  : "Assignment update failed",
                description:
                  err.data?.message || "Something went wrong. Please try again",
                type: "error",
              });
            },
          },
        );
      }
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
        <form.Field name="notes">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Notes for technician{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  onChange={(event) =>
                    field.handleChange(event.target.value)
                  }
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  aria-invalid={isInvalid}
                />

                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        </form.Field>

        {(isAssign ||
          request.status === "PENDING" ||
          request.status === "ASSIGNED") && (
            <form.Field
              name="technicianId"
              validators={{
                onChange: ({ value }) =>
                  isAssign && !value
                    ? "Must select a technician to assign to the service request"
                    : undefined,
                onSubmit: ({ value }) =>
                  isAssign && !value
                    ? "Must select a technician to assign to the service request"
                    : undefined,
              }}
            >
              {(field) => {
                const isInvalid = field.state.meta.errors.length > 0;

                return (
                  <Field data-invalid={isInvalid}>
                    <TechnicianSelector
                      technicians={technicians}
                      value={field.state.value}
                      onSelect={field.handleChange}
                      onBlur={field.handleBlur}
                      errors={field.state.meta.errors.map((error) => ({
                        message: String(error),
                      }))}
                    />
                  </Field>
                );
              }}
            </form.Field>
          )}

        <Button type="submit" disabled={isAssignPending || isUpdatePending}>
          {(isAssignPending || isUpdatePending) ? (
            <>
              <Spinner />
              {isAssign ? "Assigning..." : "Updating..."}
            </>
          ) : isAssign ? (
            "Assign"
          ) : (
            "Update"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}