"use client";

import { type ChangeEvent, Suspense, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ServiceRequestParams, ServiceRequestStatus } from "@/types";
import useDebounce from "@/hooks/debounce.hook";
import { Input } from "@/components/ui/input";
import RequestSubmitDialog from "./request-submit-dialog";
import MyServiceRequestTable from "./my-service-request-table";
import MyServiceRequestTableLoading from "./my-service-request-table-loading";

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

export default function MyServiceRequestList() {
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
        <RequestSubmitDialog />
      </div>

      <Suspense fallback={<MyServiceRequestTableLoading />}>
        <MyServiceRequestTable {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </>
  );
}
