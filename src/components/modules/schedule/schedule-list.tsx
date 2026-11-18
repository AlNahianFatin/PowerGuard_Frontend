"use client";

import { type ChangeEvent, Suspense, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ScheduleParams, ScheduleStatus } from "@/types";
import ScheduleListLoading from "./schedule-list-loading";
import ScheduleTable from "./schedule-table";
import ScheduleCreateDialog from "./schedule-create-dialog";
import useDebounce from "@/hooks/debounce.hook";
import { Input } from "@/components/ui/input";
import { useGetAllFeeders } from "@/hooks";
import { toast } from "@/components/ui/toast";

const statuses: ["ALL" | ScheduleStatus, string][] = [
  ["ALL", "All"],
  ["DRAFT", "Draft"],
  ["PUBLISHED", "Published"],
  ["CANCELLED", "Cancelled"],
  ["COMPLETED", "Completed"]
];

export default function ScheduleList() {
  const {
    data,
    isPending: feedersLoading,
    isError: feedersError,
  } = useGetAllFeeders();

  const feeders = data?.data ?? [];

  useEffect(() => {
    if (feedersLoading)
      return;
  }, [feedersLoading]);

  useEffect(() => {
    if (feedersError) {
      toast.add({
        title: "Server Failure",
        description: "Could not get available areas. Please try again.",
        type: "error",
      });
    }
  }, [feedersError]);

  const [tab, setTab] = useState<"ALL" | ScheduleStatus>("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput);

  const handleSearch = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const queryParams: ScheduleParams = {
    page,
    limit: 10,
    sortBy: "startDateTime",
    sortOrder: "asc",
    ...(tab === "ALL" ? {} : { status: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  return (
    <>
      <div className="my-5 flex justify-between gap-3">
        <Input
          onChange={(e) => handleSearch(e)}
          type="search"
          placeholder="Search by name or email"
          className="w-50"
        />
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            {statuses.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ScheduleCreateDialog feeders={feeders} />
      </div>

      <Suspense fallback={<ScheduleListLoading />}>
        <ScheduleTable {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </>
  );
}
