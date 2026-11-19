"use client";

import { FieldSeparator } from "@/components/ui/field";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Role, Schedule } from "@/types";

interface Props {
  schedule: Schedule;
  open: boolean;
  onClose: () => void;
}

export default function ScheduleDetailSheet({
  schedule,
  open,
  onClose,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="p-3">
        <SheetHeader>
          <SheetTitle className="text-center">Schedule details</SheetTitle>
          {/* <SheetDescription className="text-center">
            {schedule.reason}
          </SheetDescription> */}
        </SheetHeader>
        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Reason</dt>
            <dd>
              {schedule.reason}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-muted-foreground">Start</dt>
            <dd>
              {new Date(schedule.startDateTime).toLocaleString(undefined, {
                dateStyle: "full",
              })},&nbsp;
              {new Date(schedule.startDateTime).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-muted-foreground">End</dt>
            <dd>
              {new Date(schedule.endDateTime).toLocaleString(undefined, {
                dateStyle: "full",
              })},&nbsp;
              {new Date(schedule.endDateTime).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-muted-foreground">Status</dt>
            <dd>{schedule.status}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-muted-foreground">Created on</dt>
            <dd>
              {new Date(schedule.createdAt).toLocaleString(undefined, {
                dateStyle: "full",
              })},&nbsp;
              {new Date(schedule.createdAt).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-muted-foreground">Updated on</dt>
            <dd>
              {new Date(schedule.updatedAt).toLocaleString(undefined, {
                dateStyle: "full",
              })},&nbsp;
              {new Date(schedule.updatedAt).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
            </dd>
          </div>

          {
            schedule.isDeleted &&
            <>
              <FieldSeparator />

              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Deleted by</dt>
                <dd className="truncate">
                  {schedule.deletedByUser?.name}
                </dd>
              </div>

              {
                schedule.deletedAt &&
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Deleted on</dt>
                  <dd className="truncate">
                    {new Date(schedule?.deletedAt).toLocaleString(undefined, {
                      dateStyle: "full",
                    })},&nbsp;
                    {new Date(schedule?.deletedAt).toLocaleTimeString(undefined, {
                      timeStyle: "short",
                    })}
                  </dd>
                </div>
              }
            </>
          }
          {/* <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Meeting link</dt>
            <dd className="truncate">
              <a
                href={schedule.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-primary"
              >
                Join
              </a>
            </dd>
          </div> */}
        </dl>
      </SheetContent>
    </Sheet>
  );
}
