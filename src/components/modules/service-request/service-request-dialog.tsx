import CreateScheduleForm from "@/components/form/create-schedule-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Feeder } from "@/types";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function ServiceRequestDialog({ feeders }: { feeders: Feeder[] }) {
  const [open, setOpen] = useState(false);

  // return (
  //   <Dialog open={open} onOpenChange={setOpen}>
  //     <DialogTrigger render={<Button size="lg" />}>
  //       <PlusCircle />
  //       <span>Assign Technician</span>
  //     </DialogTrigger>
  //     <DialogContent>
  //       <DialogHeader>
  //         <DialogTitle>Create Schedule</DialogTitle>
  //         <DialogDescription>
  //           This schedule will be visible to everyone
  //         </DialogDescription>
  //       </DialogHeader>
  //       <CreateScheduleForm feeders={feeders} handleClose={() => setOpen(false)} />
  //     </DialogContent>
  //   </Dialog>
  // );

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Technician</DialogTitle>
          <DialogDescription>
            Select a technician and provide optional assignment notes.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
          className="min-w-fit"
        >
          {/* Keep your existing FieldGroup and form fields here */}
        </form>
      </DialogContent>
    </Dialog>
  );
}
