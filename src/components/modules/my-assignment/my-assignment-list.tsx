"use client";

import { type ChangeEvent, Suspense, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Role, ServiceRequestParams, ServiceRequestStatus } from "@/types";
import useDebounce from "@/hooks/debounce.hook";
import { Input } from "@/components/ui/input";
import MyAssignmentTableLoading from "./my-assignment-table-loading";
import MyAssignmentTable from "./my-assignment-table";

const statuses: ["ALL" | ServiceRequestStatus, string][] = [
  ["ALL", "All"], //lime emerald teal cyan sky indigo fuchsia rose slate stone mauve olive
  ["PENDING", "Pending"],
  ["ASSIGNED", "Assigned"],
  ["INSPECTING", "Inspecting"],
  ["PAYMENTPENDING", "Payment Pending"],
  ["INPROGRESS", "Inprogress"],
  ["RESOLVED", "Resolved"],
  ["FAILED", "Failed"],
  ["REJECTED", "Rejected"],
  ["CANCELLED", "Cancelled"],
];

export default function MyAssignmentList({ role }: { role: Role }) {
  const [tab, setTab] = useState<"ALL" | ServiceRequestStatus>("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput);

  const handleSearch = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const queryParams: ServiceRequestParams = {
    page,
    limit: 10,
    sortBy: "createdAt",
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
          placeholder={`Search by request, customer, area or ${role === "TECHNICIAN" ? "assignee" : "technician"}`}
          className="w-85"
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
      </div>

      <Suspense fallback={<MyAssignmentTableLoading />}>
        <MyAssignmentTable role={role} {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </>
  );
}
