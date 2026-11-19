import z from "zod";

export const submitRequestSchema = z.object({
    title: z
        .string("Must include a valid service request title")
        .min(1, "Service request title is required")
        .max(255, "Service request title must be within 255 characters"),

    description: z
        .string("Must include a valid service request description")
        .max(255, "Service request description must be within 255 characters")
        .optional(),

    areaId: z
        .string("Must include a valid area")
        .min(1, "Must select an area to let our technician know your location"),
});

export const UpdateRequestSchema = z.object({
    title: z
        .string("Must include a valid service request title")
        .min(1, "Service request title is required")
        .max(255, "Service request title must be within 255 characters")
        .optional(),

    description: z
        .string("Must include a valid service request description")
        .max(255, "Service request description must be within 255 characters")
        .optional(),

    areaId: z
        .string("Must include a valid area")
        .optional(),
});

export const CancelRequestSchema = z.object({
    requestId: z.string("Must include a valid service request ID"),
});

export const RejectRequestSchema = z.object({
    rejectionReason: z
        .string("Must include a valid rejection reason")
        .min(1, "Rejection reason is required")
        .max(255, "Rejection reason must be within 255 characters"),
});