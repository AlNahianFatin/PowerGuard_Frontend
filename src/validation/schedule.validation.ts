import z from "zod";

//* startTime => 10:45
//* endTime => 10:50

// const MINIMUM_SLOT_MINUTE = 20;

// // https://meet.google.com/aiu-ctor-moh;

// const GOOGLE_MEET_REGEX =
//   /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;

// function slotMinutes(startTime: string, endTime: string) {
//   const [startHour, startMin] = startTime.split(":").map(Number);
//   const [endHour, endMin] = endTime.split(":").map(Number);

//   return endHour * 60 + endMin - (startHour * 60 + startMin);
// }

// export const scheduleSchema = z
//   .object({
//     date: z.string().min(1, "Date is required"),
//     startTime: z.string().min(1, "Start time is required"),
//     endTime: z.string().min(1, "End time is required"),
//     meetingLink: z
//       .string()
//       .trim()
//       .min(1, "Meeting link is required")
//       .regex(
//         GOOGLE_MEET_REGEX,
//         "Please provide a valid Google Meet link (e.g. https://meet.google.com/abc-defg-hij)",
//       ),
//   })
//   .refine((value) => value.startTime < value.endTime, {
//     message: "End time must be after start time",
//     path: ["endTime"],
//   })
//   .refine(
//     (value) =>
//       slotMinutes(value.startTime, value.endTime) >= MINIMUM_SLOT_MINUTE,
//     {
//       message: `Slot time must be at least ${MINIMUM_SLOT_MINUTE} min`,
//       path: ["endTime"],
//     },
//   );

export const CreateScheduleSchema = z.object({
  startDateTime: z
    .iso
    .datetime({
      error: "Please select a valid start date and time",
    }),
  endDateTime: z
    .iso
    .datetime({
      error: "Please select a valid end date and time",
    }),
  reason: z
    .string("Must include a valid reason")
    .min(1, "Must declare a reason")
    .max(1000, "Reason must be within 1000 characters!"),
  feederId: z
    .string("Must include a valid feeder")
    .min(1, "Must select a feeder on which the outage will be scheduled on"),
})
  .refine(
    (data) =>
      new Date(data.endDateTime) > new Date(data.startDateTime),
    {
      message: "End date and time must be after the start date and time",
      path: ["endDateTime"],
    },
  );

export const UpdateScheduleSchema = z.object({
  startDateTime: z
    .iso
    .datetime({
      error: "Please select a valid start date and time",
    })
    .optional(),

  endDateTime: z
    .iso
    .datetime({
      error: "Please select a valid end date and time",
    })
    .optional(),

  reason: z
    .string("Must include a valid reason")
    .min(1, "Must declare a reason")
    .max(1000, "Reason must be within 1000 characters!")
    .optional(),

  feederId: z
    .string("Must include a valid feeder")
    .min(1, "Must select a feeder on which the outage will be scheduled on")
    .optional(),
});