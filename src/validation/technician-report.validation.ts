import { z } from "zod";

// export const SubmitReportSchema = z.object({
//     diagnosis: z
//         .string("Must include a valid report diagnosis")
//         .min(1, "Report diagnosis is required")
//         .max(255, "Report diagnosis must be within 255 characters"),

//     charge: z
//         .number("Charge must be a valid number")
//         .int("Service charge must be whole number")
//         .min(0, "Charge cannot be negative")
//         .max(99999999.99, "Charge cannot be more than 99999999.99"),
// });

// export const UpdateReportSchema = z.object({
//     diagnosis: z
//         .string("Must include a valid report diagnosis")
//         .max(255, "Report diagnosis must be within 255 characters")
//         .optional(),

//     charge: z
//         .number("Charge must be a valid number")
//         .min(0, "Charge cannot be negative")
//         .max(99999999.99, "Charge cannot be more than 99999999.99")
//         .optional(),
// });



export const SubmitReportSchema = z.object({
  diagnosis: z
    .string("Must include a valid report diagnosis")
    .trim()
    .min(1, "Report diagnosis is required")
    .max(255, "Report diagnosis must be within 255 characters"),

  charge: z
    .number("Charge must be a valid number")
    .int("Service charge must be a whole number")
    .min(0, "Charge cannot be negative")
    .max(99999999, "Charge cannot be more than 99999999"),
});

export const UpdateReportSchema = z.object({
  diagnosis: z
    .string("Must include a valid report diagnosis")
    .trim()
    .max(255, "Report diagnosis must be within 255 characters")
    .optional(),

  charge: z
    .number("Charge must be a valid number")
    .int("Service charge must be a whole number")
    .min(0, "Charge cannot be negative")
    .max(99999999, "Charge cannot be more than 99999999")
    .optional(),
});