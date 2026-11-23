"use client";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import {
  useSubmitTechnicianReport,
  useUpdateTechnicianReport,
} from "@/hooks";
import {
  SubmitReportSchema,
  UpdateReportSchema,
} from "@/validation";
import type { Assignment } from "@/types";
import { BookText, WalletMinimal } from "lucide-react";
import { useState } from "react";

interface Props {
  action: "SUBMIT REPORT" | "UPDATE REPORT";
  assignment: Assignment;
  handleClose: () => void;
}

type FormValues = {
  diagnosis: string;
  charge: number | "";
};

export default function SubmitTechnicianReportForm({
  action,
  assignment,
  handleClose,
}: Props) {
  const [validationErrors, setValidationErrors] = useState<{
    diagnosis: { message: string }[];
    charge: { message: string }[];
  }>({
    diagnosis: [],
    charge: [],
  });

  const validate = (value: FormValues) => {
    const result = isSubmit
      ? SubmitReportSchema.safeParse(value)
      : UpdateReportSchema.safeParse(value);

    const errors = {
      diagnosis: [] as { message: string }[],
      charge: [] as { message: string }[],
    };

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (field === "diagnosis" || field === "charge") {
          errors[field].push({
            message: issue.message,
          });
        }
      }
    }

    setValidationErrors(errors);

    return undefined;
  };

  const {
    mutate: submit,
    isPending: isSubmitPending,
  } = useSubmitTechnicianReport();

  const {
    mutate: update,
    isPending: isUpdatePending,
  } = useUpdateTechnicianReport();

  const isSubmit = action === "SUBMIT REPORT";

  const defaultValues: FormValues = {
    diagnosis: assignment.technicianReport?.diagnosis ?? "",
    charge: Number(assignment.technicianReport?.charge ?? 0),
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: ({ value }) => validate(value),
      onSubmit: ({ value }) => validate(value),
    },
    onSubmit: ({ value }) => {
      if (isSubmit) {
        submit(
          {
            assignmentId: assignment.id,
            payload: {
              diagnosis: value.diagnosis,
              charge: value.charge === "" ? 0 : value.charge,
            },
          },
          {
            // biome-ignore lint/suspicious/noExplicitAny: API response
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
                title: "Report Submitted",
                description:
                  res.message ||
                  "Technician report submitted successfully",
                type: "success",
              });

              handleClose();
            },

            // biome-ignore lint/suspicious/noExplicitAny: API error
            onError: (err: any) => {
              toast.add({
                title: "Report submission failed",
                description:
                  err.data?.message ||
                  "Something went wrong. Please try again",
                type: "error",
              });
            },
          },
        );
      } else {
        update(
          {
            reportId: assignment.technicianReport?.id as string,
            payload: {
              diagnosis: value.diagnosis,
              ...(value.charge !== "" && {
                charge: value.charge,
              }),
            },
          },
          {
            // biome-ignore lint/suspicious/noExplicitAny: API response
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
                title: "Report Updated",
                description:
                  res.message ||
                  "Technician report updated successfully",
                type: "success",
              });

              handleClose();
            },

            // biome-ignore lint/suspicious/noExplicitAny: API error
            onError: (err: any) => {
              toast.add({
                title: "Report update failed",
                description:
                  err.data?.message ||
                  "Something went wrong. Please try again",
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
        <form.Field name="diagnosis">
          {(field) => {
            const errors = validationErrors.diagnosis;
            const isInvalid = errors.length > 0;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Diagnosis report
                </FieldLabel>

                <div className="relative">
                  <BookText className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    className="pl-9"
                    placeholder="Enter diagnosis report"
                    value={field.state.value}
                    onChange={(event) =>
                      field.handleChange(event.target.value)
                    }
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                </div>

                {isInvalid && <FieldError errors={errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="charge">
          {(field) => {
            const errors = validationErrors.charge;
            const isInvalid = errors.length > 0;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Service charge
                </FieldLabel>

                <div className="relative">
                  <WalletMinimal className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={99999999}
                    step={1}
                    placeholder="Enter service charge"
                    value={field.state.value}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.handleChange(value === "" ? "" : Number(value));
                    }}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    className="pl-9"
                  />
                </div>

                {isInvalid && <FieldError errors={errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Submit / Update */}
        <Button
          type="submit"
          disabled={isSubmitPending || isUpdatePending}
        >
          {isSubmitPending || isUpdatePending ? (
            <>
              <Spinner />
              {isSubmit ? "Submitting..." : "Updating..."}
            </>
          ) : isSubmit ? (
            "Submit Report"
          ) : (
            "Update Report"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
