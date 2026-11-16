// "use client";

// import { useForm } from "@tanstack/react-form";
// import { Eye, EyeOff, Lock, Mail, MapPin, Phone, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import type z from "zod";
// import { toast } from "../ui/toast";
// import { Spinner } from "../ui/spinner";
// import { submitRequestValidationSchema } from "@/validation/service-request.validation";
// import { useSubmitRequest } from "@/hooks/service-request.hook";
// import { useGetAllAreas } from "@/hooks";

// export function SubmitRequestForm() {
//   const { data } = useGetAllAreas();

//   const areas = data?.data || [];
//   const isEmpty = areas.length === 0;

//   if (areas.length === 0) {
//     toast.add({
//       title: "Server Failure",
//       description: "Could not get available areas. Please try again",
//       type: "error",
//     });
//     return;
//   }

//   type SubmitRequestDefaultValues = z.infer<typeof submitRequestValidationSchema>;

//   const defaultValues: SubmitRequestDefaultValues = {
//     title: "",
//     areaId: "",
//     description: "",
//   };

//   const { mutate: submitRequest, isPending: submitRequestPending } =
//     useSubmitRequest();

//   // const isSubmitting = registrationPending || googlePending;

//   const form = useForm({
//     defaultValues,
//     validators: {
//       onChange: submitRequestValidationSchema,
//       onSubmit: submitRequestValidationSchema,
//     },
//     onSubmit: async ({ value }) => {
//       const submitRequestData = {


//         title: value.title,
//         areaId: value.areaId,
//         description: value.description,
//       };

//       submitRequest(submitRequestData, {
//         // biome-ignore lint/suspicious/noExplicitAny: <asd>
//         onSuccess: (res: any) => {
//           if (!res.success) {
//             toast.add({
//               title: "Server Failure",
//               description: res.data?.message || res.message || "Something went wrong. Please try again",
//               type: "error",
//             });
//           }

//           toast.add({
//             title: "Submit Successful",
//             description: res.data?.message || res.message || "Successfully submitted your service request",
//             type: "success",
//           });
//         },
//         // biome-ignore lint/suspicious/noExplicitAny: <vds>
//         onError: (err: any) => {
//           toast.add({
//             title: "Submit failure",
//             description:
//               err.data?.message || "Something went wrong. Please try again",
//             type: "error",
//           });
//         },
//       });
//     },
//   });

//   return (
//     <div className="flex flex-col gap-6">
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold tracking-tight">Submit a service request</h1>
//         <p className="text-sm text-muted-foreground">
//           Enter details regarding the service request
//         </p>
//       </div>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           form.handleSubmit();
//         }}
//       >
//         <FieldGroup>
//           <form.Field name="title">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;
//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Title</FieldLabel>
//                   <div className="relative">
//                     <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id={field.name}
//                       name={field.name}
//                       type="text"
//                       placeholder="Issue"
//                       value={field.state.value}
//                       onBlur={field.handleBlur}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       aria-invalid={isInvalid}
//                       autoComplete="off"
//                       className="pl-9"
//                     />
//                   </div>
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           <form.Field name="description">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;
//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Description{" "}</FieldLabel>
//                   <span className="font-normal text-muted-foreground">
//                     (optional)
//                   </span>
//                   <div className="relative">
//                     <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id={field.name}
//                       name={field.name}
//                       type="textArea"
//                       placeholder="Explain your issue"
//                       value={field.state.value}
//                       onBlur={field.handleBlur}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       aria-invalid={isInvalid}
//                       autoComplete="off"
//                       className="pl-9"
//                     />
//                   </div>
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           <form.Field name="areaId">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;
//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Area
//                   </FieldLabel>
//                   <div className="relative">
//                     <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id={field.name}
//                       name={field.name}
//                       type="tel"
//                       placeholder="+880 1712 345678"
//                       value={field.state.value}
//                       onBlur={field.handleBlur}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       aria-invalid={isInvalid}
//                       autoComplete="off"
//                       className="pl-9"
//                     />
//                   </div>
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           <Button disabled={submitRequestPending} type="submit">
//             {submitRequestPending ? (
//               <>
//                 <Spinner /> Submitting
//               </>
//             ) : (
//               "Submit"
//             )}
//           </Button>
//         </FieldGroup>
//       </form>
//     </div>
//   );
// }




"use client";

import { useForm } from "@tanstack/react-form";
import { MapPin, User } from "lucide-react";
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

import { submitRequestValidationSchema } from "@/validation/service-request.validation";
import { useSubmitRequest } from "@/hooks/service-request.hook";
import { useGetAllAreas } from "@/hooks";
import type { Area } from "@/types";

export function SubmitRequestForm() {
  const {
    data,
    isPending: areasLoading,
    isError: areasError,
  } = useGetAllAreas();

  const areas = data?.data ?? [];

  useEffect(() => {
    if (areasLoading)
      return;
  }, [areasLoading]);

  const {
    mutate: submitRequest,
    isPending: submitRequestPending,
  } = useSubmitRequest();

  const defaultValues: z.infer<typeof submitRequestValidationSchema> = {
    title: "",
    areaId: "",
    description: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: submitRequestValidationSchema,
      onSubmit: submitRequestValidationSchema,
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
                res.data?.message ||
                res.message ||
                "Successfully submitted your service request.",
              type: "success",
            });

            form.reset();
          },

          // biome-ignore lint/suspicious/noExplicitAny: API error
          onError: (err: any) => {
            toast.add({
              title: "Submit Failure",
              description:
                err.data?.message ||
                err.message ||
                "Something went wrong. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  useEffect(() => {
    if (areasError) {
      toast.add({
        title: "Server Failure",
        description: "Could not get available areas. Please try again.",
        type: "error",
      });
    }
  }, [areasError]);

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
                    <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

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
                      className="pl-9"
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

          {/* Area Selection */}
          <form.Field name="areaId">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Area
                  </FieldLabel>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      disabled={areasLoading || areas.length === 0}
                      aria-invalid={isInvalid}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent py-1 pl-9 pr-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="" disabled>
                        {areasLoading
                          ? "Loading areas..."
                          : areas.length === 0
                            ? "No areas available"
                            : "Select your area"}
                      </option>

                      {areas.map((area: Area) => (
                        <option key={area.id} value={area.id}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
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
