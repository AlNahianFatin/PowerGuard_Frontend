"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ChangeEvent, Suspense, useState } from "react";
import type { Role, TechnicianParams, TechnicianVerificationStatus } from "@/types";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/debounce.hook";
import TechnicianApprovalTableLoading from "./technician-approval-table-loading";
import TechnicianApprovalTable from "./technician-approval-table";
import TechnicianReviewSheet from "./technician-review-sheet";

const verificationStatus: ["ALL" | TechnicianVerificationStatus, string][] = [
  ["ALL", "All"],
  ["PENDING", "Pending"],
  ["APPROVED", "Approved"],
  ["REJECTED", "Rejected"],
];

export default function TechnicianApprovalTabs({ role = "OPERATOR" }: { role?: Role }) {
  const [tab, setTab] = useState<"ALL" | TechnicianVerificationStatus>("ALL");
  const [selectedId, setSelectedId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput);

  const handleSearch = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const queryParams: TechnicianParams = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  return (
    <>
      <div className="flex justify-baseline my-5 gap-35">
        <div>
          <Input
            onChange={(e) => handleSearch(e)}
            type="search"
            placeholder="Search by name or email"
            className="w-50"
          />
        </div>
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            {verificationStatus.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Suspense fallback={<TechnicianApprovalTableLoading role={role} />}>
        <TechnicianApprovalTable role={role}
          {...queryParams}
          handleReview={setSelectedId}
          handlePageChange={setPage}
        />
      </Suspense>

      <TechnicianReviewSheet
        role={role}
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
        {...queryParams}
      />
    </>
  );
}
