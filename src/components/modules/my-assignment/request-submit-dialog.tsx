import { SubmitRequestForm } from "@/components/form/submit-request-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

export default function RequestSubmitDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="lg" />}>
        <CirclePlus />
        <span>New Request</span>
      </DialogTrigger>
      <DialogContent>
        <SubmitRequestForm handleClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
