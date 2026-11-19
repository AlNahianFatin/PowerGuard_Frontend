"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { User } from "@/types";
import { Briefcase, FileText, Mail, MapPin, Phone, UserRound } from "lucide-react";

interface Props {
  user: User;
  open: boolean;
  onClose: () => void;
}

export default function TechnicianApprovalUserDetailSheet({
  user,
  open,
  onClose,
}: Props) {
  console.log(user);
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="p-3">
        <SheetHeader className="border-b">
          <SheetTitle className="text-center">
            Reviewer Details
          </SheetTitle>

          <SheetDescription className="text-center">
            Check out the reviewer
          </SheetDescription>
        </SheetHeader>

        <div className="flex items-start gap-3">
          <span className="rounded-full bg-primary/10 p-2.5">
            <UserRound className="size-5 text-primary" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold mt-2">{user.name}</p>
          </div>
        </div>

        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Role</dt>
            <dd>{user.role}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-muted-foreground">Email</dt>
            <dd>{user.email}</dd>
          </div>

        </dl>
      </SheetContent>
    </Sheet>
  );
}
