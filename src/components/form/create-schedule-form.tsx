"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { format, parseISO, isValid } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { useCreateSchedule } from "@/hooks";
import { CreateScheduleSchema } from "@/validation";
import type { Feeder } from "@/types";
import FeederSelector from "../modules/feeder/feeder-selector-table";

type DateTimePickerProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  errors: { message?: string }[];
};

function DateTimePicker({
  id,
  label,
  value,
  onChange,
  onBlur,
  errors,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);

  const parsedDate =
    value && isValid(parseISO(value)) ? parseISO(value) : undefined;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    parsedDate,
  );

  const [selectedTime, setSelectedTime] = useState(
    parsedDate ? format(parsedDate, "HH:mm") : "",
  );

  const isInvalid = errors.length > 0;

  const updateDateTime = (date: Date | undefined, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);

    if (!date || !time) {
      onChange("");
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);

    const localDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );

    onChange(localDateTime.toISOString());
  };

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="outline"
                id={id}
                aria-invalid={isInvalid}
                className="min-w-0 flex-1 justify-between font-normal"
              >
                {selectedDate
                  ? format(selectedDate, "PPP")
                  : "Select date"}

                <ChevronDownIcon className="size-4 shrink-0" />
              </Button>
            }
          />

          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="start"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              captionLayout="dropdown"
              defaultMonth={selectedDate ?? new Date()}
              disabled={{
                before: new Date(new Date().setHours(0, 0, 0, 0)),
              }}
              onSelect={(date) => {
                if (!date) return;

                updateDateTime(date, selectedTime);
                setOpen(false);
                onBlur();
              }}
            />
          </PopoverContent>
        </Popover>

        <Input
          type="time"
          step="60"
          id={`${id}-time`}
          value={selectedTime}
          onChange={(event) =>
            updateDateTime(selectedDate, event.target.value)
          }
          onBlur={onBlur}
          aria-invalid={isInvalid}
          className="w-32 appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>

      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
}

export default function CreateScheduleForm({
  feeders,
  handleClose,
}: {
  feeders: Feeder[]
  handleClose: () => void;
}) {
  const { mutate: create, isPending } = useCreateSchedule();

  const form = useForm({
    defaultValues: {
      startDateTime: "",
      endDateTime: "",
      reason: "",
      feederId: "",
    },
    validators: {
      onChange: CreateScheduleSchema,
      onSubmit: CreateScheduleSchema,
    },
    onSubmit: ({ value }) => {
      const scheduleValue = {
        startDateTime: value.startDateTime,
        endDateTime: value.endDateTime,
        reason: value.reason,
        feederId: value.feederId,
      };

      create(scheduleValue, {
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
        <form.Field name="startDateTime">
          {(field) => (
            <DateTimePicker
              id={field.name}
              label="Start Date & Time"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => ({
                message:
                  typeof error === "string" ? error : error?.message,
              }))}
            />
          )}
        </form.Field>

        <form.Field name="endDateTime">
          {(field) => (
            <DateTimePicker
              id={field.name}
              label="End Date & Time"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => ({
                message:
                  typeof error === "string" ? error : error?.message,
              }))}
            />
          )}
        </form.Field>

        <form.Field name="reason">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Outage reason
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

        <form.Field name="feederId">
          {(field) => (
            <FeederSelector
              feeders={feeders}
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
              Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
