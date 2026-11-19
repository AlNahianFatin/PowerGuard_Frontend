"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useDeleteSchedule, usePublishSchedule } from "@/hooks";
import type { Schedule } from "@/types";
import ScheduleDetailSheet from "./schedule-detail-sheet";

export default function ScheduleActions({ schedule }: { schedule: Schedule }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutate: publish, isPending: publishPending } = usePublishSchedule();
  const { mutate: remove, isPending: deletePending } = useDeleteSchedule();

  const locked = schedule.status === "PUBLISHED" || schedule.isDeleted;

  const handlePublish = () => {
    publish(schedule.id, {
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
          title: "Schedule Published",
          description: res.message || "Officially published the outage schedule",
          type: "success",
        });
      },
      // biome-ignore lint/suspicious/noExplicitAny: <fg>
      onError: (err: any) => {
        toast.add({
          title: "Publish failed",
          description: err.data?.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };

  const handleDelete = () => {
    remove(schedule.id, {
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
          title: "Schedule Deleted",
          description: res.message || "Schedule removed successfully",
          type: "success",
        });
        setConfirmDelete(false);
      },

      // biome-ignore lint/suspicious/noExplicitAny: <dfg>
      onError: (err: any) => {
        toast.add({
          title: "Delete failed",
          description: err.data?.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };

  if (confirmDelete) {
    return (
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirmDelete(false)}
        >
          Cancel
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={deletePending}
        >
          Confirm
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setDetailOpen(true)}>
          View
        </Button>

        {schedule.status === "DRAFT" && !schedule.isDeleted && (
          <Button size="sm" onClick={handlePublish} disabled={publishPending}>
            Publish
          </Button>
        )}

        {!locked && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </Button>
        )}
      </div>

      <ScheduleDetailSheet
        schedule={schedule}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
}
