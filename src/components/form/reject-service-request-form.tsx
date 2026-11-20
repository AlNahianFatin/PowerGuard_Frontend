"use client";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { useRejectRequest } from "@/hooks";
import { RejectRequestSchema } from "@/validation";

interface Props {
  requestId: string;
  handleClose: () => void;
}

export default function RejectServiceRequestForm({
  requestId,
  handleClose,
}: Props) {
  const { mutate: reject, isPending } = useRejectRequest();

  const form = useForm({
    defaultValues: {
      rejectionReason: "",
    },
    validators: {
      onChange: RejectRequestSchema,
      onSubmit: RejectRequestSchema,
    },
    onSubmit: ({ value }) => {
      reject(
        {
          requestId,
          payload: {
            rejectionReason: value.rejectionReason,
          },
        },
        {
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
              title: "Schedule Created",
              description: res.message || "Your schedule is saved as a draft",
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
        <form.Field name="rejectionReason">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Reject reason
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

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner />
              Rejecting
            </>
          ) : (
            "Reject"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
