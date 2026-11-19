"use client";

import { FieldSeparator } from "@/components/ui/field";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { User } from "@/types";

interface Props {
  user: User;
  isCreator?: boolean;
  open: boolean;
  onClose: () => void;
}

export default function ScheduleUserDetailSheet({
  user,
  isCreator = false,
  open,
  onClose,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="p-3">
        <SheetHeader>
          <SheetTitle className="text-center">
            {
              isCreator ? "Schedule Creator Details" : "Schedule Deletor Details"
            }
          </SheetTitle>
          {/* <SheetDescription className="text-center">
            {schedule.reason}
          </SheetDescription> */}
        </SheetHeader>
        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Name</dt>
            <dd>
              {user.name}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-muted-foreground">Email</dt>
            <dd>
              {user.email}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-muted-foreground">Role</dt>
            <dd>
              {user.role}
            </dd>
          </div>

        </dl>
      </SheetContent>
    </Sheet>
  );
}
