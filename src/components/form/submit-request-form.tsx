"use client";

import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import type z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "../ui/toast";

import { submitRequestSchema } from "@/validation/service-request.validation";
import { useSubmitRequest } from "@/hooks/service-request.hook";
import { useGetAllAreas } from "@/hooks";
import AreaSelector from "../modules/area/area-selector-table";

export function SubmitRequestForm({ handleClose }: { handleClose: () => void; }) {
  const {
    data,
    isPending: areasLoading,
    isError: areasError
  } = useGetAllAreas();

  const areas = data?.data ?? [];

  useEffect(() => {
    if (areasLoading)
      return;
  }, [areasLoading]);

  useEffect(() => {
    if (areasError) {
      toast.add({
        title: "Server Failure",
        description: "Could not get available areas. Please try again.",
        type: "error",
      });
    }
  }, [areasError]);

  const {
    mutate: submitRequest,
    isPending: submitRequestPending,
  } = useSubmitRequest();

  const defaultValues: z.infer<typeof submitRequestSchema> = {
    title: "",
    areaId: "",
    description: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: submitRequestSchema,
      onSubmit: submitRequestSchema,
    },
    onSubmit: async ({ value }) => {
      submitRequest(
        {
          title: value.title,
          areaId: value.areaId,
          description: value.description,
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
                  "Something went wrong. Please try again.",
                type: "error",
              });
              return;
            }

            toast.add({
              title: "Submit Successful",
              description:
                res.message ||
                "Successfully submitted your service request.",
              type: "success",
            });

            handleClose();
          },

          // biome-ignore lint/suspicious/noExplicitAny: API error
          onError: (err: any) => {
            toast.add({
              title: "Submit Failure",
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Submit a service request
        </h1>

        <p className="text-sm text-muted-foreground">
          Enter details regarding the service request
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* Request Title */}
          <form.Field name="title">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Title
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Enter request title"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                  </div>

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Request Description */}
          <form.Field name="description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center gap-2">
                    <FieldLabel htmlFor={field.name}>
                      Description
                    </FieldLabel>

                    <span className="text-xs text-muted-foreground">
                      (optional)
                    </span>
                  </div>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder="Explain your issue"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(event.target.value)
                    }
                    aria-invalid={isInvalid}
                    autoComplete="off"
                    rows={4}
                  />

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="areaId">
            {(field) => (
              <AreaSelector
                areas={areas}
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

          <Button
            disabled={
              submitRequestPending ||
              areasLoading ||
              areas.length === 0
            }
            type="submit"
          >
            {submitRequestPending ? (
              <>
                <Spinner />
                Submitting
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
