"use client";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { useAssignTechnician } from "@/hooks";
import { AssignTechnicianSchema } from "@/validation";
import type z from "zod";
import type { Technician } from "@/types";
import TechnicianSelector from "../modules/technician/technician-selector-table";

interface Props {
  requestId: string;
  technicians: Technician[];
  open: boolean;
  handleClose: () => void;
}

export default function AssignTechnicianForm({
  requestId,
  technicians,
  open,
  handleClose,
}: Props) {
  const { mutate: assign, isPending } = useAssignTechnician();

  type AssignTechnicianDefaultValues = z.input<typeof AssignTechnicianSchema>;

  const defaultValues: AssignTechnicianDefaultValues = {
    technicianId: "",
    notes: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: AssignTechnicianSchema,
      onSubmit: AssignTechnicianSchema,
    },
    onSubmit: ({ value }) => {
      const data = {
        requestId,
        payload: {
          technicianId: value.technicianId,
          notes: value.notes,
        }
      };

      assign(data, {
        // biome-ignore lint/suspicious/noExplicitAny: <sd>
        onSuccess: (res: any) => {
          if (!res.success) {
            toast.add({
              title: "Server Failure",
              description: res.data?.message || res.message || "Something went wrong. Please try again",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Assignment successful",
            description: res.message || "Technician assigned successfully",
            type: "success",
          });

          handleClose();
        },

        // biome-ignore lint/suspicious/noExplicitAny: <sdf>
        onError: (err: any) => {
          toast.add({
            title: "Schedule creation failed",
            description:
              err.data?.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
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
                  value={field.state.value}
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

        <form.Field name="technicianId">
          {(field) => (
            <TechnicianSelector
              technicians={technicians}
              value={field.state.value}
              onSelect={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => ({
                message:
                  typeof error === "string" ? error : error?.message,
              }))}
            />
          )}
        </form.Field>

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner />
              Assigning
            </>
          ) : (
            "Assign"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
