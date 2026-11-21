"use client";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { useAssignTechnician } from "@/hooks";
import {
  AssignTechnicianSchema,
  UpdateAssignmentSchema,
} from "@/validation";
import type { Technician } from "@/types";
import type { z } from "zod";
import TechnicianSelector from "../modules/technician/technician-selector-table";

interface Props {
  action: "ASSIGN" | "UPDATE";
  requestId: string;
  technicians: Technician[];
  handleClose: () => void;
}

type FormValues = {
  technicianId: string;
  notes?: string;
};

export default function AssignTechnicianForm({
  action,
  requestId,
  technicians,
  handleClose,
}: Props) {
  const { mutate: assign, isPending } = useAssignTechnician();

  const isAssign = action === "ASSIGN";

  const defaultValues: FormValues = {
    technicianId: "",
    notes: "",
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
      assign(
        {
          requestId,
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

        {
          isAssign &&
          <form.Field name="technicianId">
            {(field) => (
              <TechnicianSelector
                technicians={technicians}
                value={field.state.value}
                onSelect={field.handleChange}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors.map((error) => ({
                  message: String(error),
                }))}
              />
            )}
          </form.Field>
        }

        <Button type="submit" disabled={isPending}>
          {isPending ? (
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