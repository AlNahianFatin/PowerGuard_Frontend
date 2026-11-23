"use client";

import { type ChangeEvent, Suspense, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ServiceRequestParams, ServiceRequestStatus } from "@/types";
import useDebounce from "@/hooks/debounce.hook";
import { Input } from "@/components/ui/input";
import ServiceRequestTable from "./service-request-table";
import ServiceRequestTableLoading from "./service-request-table-loading";
import { useSuspenseGetAvailableTechnicianToday } from "@/hooks";
import { toast } from "@/components/ui/toast";

const statuses: ["ALL" | "isDeleted" | ServiceRequestStatus, string][] = [
  ["ALL", "All"],
  ["PENDING", "Pending"],
  ["ASSIGNED", "Assigned"],
  ["INSPECTING", "Inspecting"],
  ["PAYMENTPENDING", "Payment Pending"],
  ["INPROGRESS", "Inprogress"],
  ["RESOLVED", "Resolved"],
  ["FAILED", "Failed"],
  ["REJECTED", "Rejected"],
  ["CANCELLED", "Cancelled"],
  ["isDeleted", "Deleted"],
];

export default function ServiceRequestList() {
  const [tab, setTab] = useState<"ALL" | "isDeleted" | ServiceRequestStatus>("ALL");
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
    ...(tab === "ALL" ? {} : tab === "isDeleted" ? { isDeleted: true } : { status: tab }),
    // ...(tab === "isDeleted" ? { isDeleted=true } : { status: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  return (
    <>
      <div className="my-5 flex justify-between gap-3">
        <Input
          onChange={(e) => handleSearch(e)}
          type="search"
          placeholder="Search by title, area or technician name"
          className="w-70"
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
        {/* <RequestSubmitDialog /> */}
      </div>

      <Suspense fallback={<ServiceRequestTableLoading />}>
        <ServiceRequestTable {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </>
  );
}
