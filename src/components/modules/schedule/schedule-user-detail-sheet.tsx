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
import { Mail, UserRound, UserShield } from "lucide-react";

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
              isCreator ? "Schedule Creator Details" : "Schedule Deleter Details"
            }
          </SheetTitle>
          {/* <SheetDescription className="text-center">
            {schedule.reason}
          </SheetDescription> */}
        </SheetHeader>
        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="rounded-full bg-primary/10 p-2.5">
              <UserRound className="size-5 text-primary" />
            </span>
            <div className="min-w-0">
              <dd className="truncate font-semibold mt-2">{user.name}</dd>
              {/* <p className="text-sm text-muted-foreground">
                {selectedTechnician.specialization}
              </p> */}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Mail className="size-4 shrink-0 text-muted-foreground" />
            <dd className="truncate" title={user.email}>
              {user.email}
            </dd>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <UserShield className="size-4 shrink-0 text-muted-foreground" />
            <span>{user.role || "—"}</span>
          </div>

        </dl>
      </SheetContent>
    </Sheet>
  );
}
