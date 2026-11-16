import z from "zod";

export const submitRequestValidationSchema = z.object({
    title: z
        .string("Must include a valid service request title")
        .min(1, "Service request title is required")
        .max(255, "Service request title must be within 255 characters"),
    description: z
        .string("Must include a valid service request description")
        .max(255, "Service request description must be within 255 characters")
        .optional(),
    areaId: z.string("Must include an area ID"),
});