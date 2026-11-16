"use client";

import { type ChangeEvent, Suspense, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ScheduleParams, ScheduleStatus } from "@/types";
import ScheduleListLoading from "./schedule-list-loading";
import ScheduleTable from "./schedule-table";
import { Button } from "@/components/ui/button";
import ScheduleCreateDialog from "./schedule-create-dialog";
import useDebounce from "@/hooks/debounce.hook";
import { Input } from "@/components/ui/input";

const statuses: ["ALL" | ScheduleStatus, string][] = [
  ["ALL", "All"],
  ["DRAFT", "Draft"],
  ["PUBLISHED", "Published"],
  ["CANCELLED", "Cancelled"],
  ["COMPLETED", "Completed"]
];

export default function ScheduleList() {
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
        <ScheduleCreateDialog />
      </div>

      <Suspense fallback={<ScheduleListLoading />}>
        <ScheduleTable {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </>
  );
}
