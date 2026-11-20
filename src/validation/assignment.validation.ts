import z from "zod";

export enum ServiceRequestStatus {
    PENDING = "PENDING",
    ASSIGNED = "ASSIGNED",
    INSPECTING = "INSPECTING",
    PAYMENTPENDING = "PAYMENTPENDING",
    INPROGRESS = "INPROGRESS",
    RESOLVED = "RESOLVED",
    FAILED = "FAILED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED",
}

export const AssignTechnicianSchema = z.object({
    technicianId: z.string("Must include the technician ID"),
    notes: z
        .string("Must include a valid note for the technician or customer")
        .min(1, "Note is required")
        .max(255, "Note must be within 255 characters")
        .optional(),
});

export const UpdateAssignmentSchema = z.object({
    technicianId: z.string("Must include the technician ID").optional(),
    notes: z
        .string("Must include a valid note for the technician or customer")
        .min(1, "Note is required")
        .max(255, "Note must be within 255 characters")
        .optional(),
});

export const UpdateAssignmentStatusSchema = z.object({
    status: z.enum(
        [
            ServiceRequestStatus.INSPECTING,
            ServiceRequestStatus.RESOLVED,
            ServiceRequestStatus.FAILED,
        ],
        "Please enter a valid status!",
    ),
    failureNote: z
        .string("Must include a valid failure note for the customer")
        .min(1, "Note is required")
        .max(255, "Note must be within 255 characters")
        .optional(),
});
