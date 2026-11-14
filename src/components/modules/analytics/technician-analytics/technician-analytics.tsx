"use client";

import {
  ClipboardList,
  Ban,
  CircleX,
  CheckCheck,
  ClipboardX,
  Wallet,
  RefreshCcw,
} from "lucide-react";

import { useGetTechnicianAnalytics } from "@/hooks";
import AnalyticsCard from "../analytics-card";
import AnalyticsSection from "../analytics-section";
import TechnicianAnalyticsLoading from "./technician-analytics-loading";
import type { TechnicianAnalyticsResponse } from "@/types";
import { formatCurrency } from "@/utils/currency-format.util";

export default function TechnicianAnalytics() {
  const { data, isLoading } = useGetTechnicianAnalytics();

  const results = data?.data;

  const analytics: TechnicianAnalyticsResponse = results ?? {
    totalAssignments: 0,
    totalCancelledAssignments: 0,
    totalRejectedAssignments: 0,
    totalResolvedAssignments: 0,
    totalFailedAssignments: 0,
    totalTechnicianRefunded: 0,
    totalTechnicianEarnings: 0,
  };

  if (isLoading) {
    return <TechnicianAnalyticsLoading />
  }

  return (
    <div className="w-full space-y-10">
      <AnalyticsSection
        title="My Assignments Overview"
        description="Monitor my assignment activity and completion statistics."
      >
        <AnalyticsCard
          title="Total Assignments"
          value={analytics.totalAssignments}
          description="All assigned assignments"
          icon={ClipboardList}
        // color="blue"
        />

        <AnalyticsCard
          title="Resolved Assignments"
          value={analytics.totalResolvedAssignments}
          description="My completed assignments"
          icon={CheckCheck}
        // color="green"
        />

        <AnalyticsCard
          title="Cancelled Assignments"
          value={analytics.totalCancelledAssignments}
          description="Customer cancelled assignments"
          icon={Ban}
        // color="red"
        />

        <AnalyticsCard
          title="Rejected Assignments"
          value={analytics.totalRejectedAssignments}
          description="Admin/operator rejected assignments"
          icon={ClipboardX}
        // color="red"
        />

        <AnalyticsCard
          title="Failed Assignments"
          value={analytics.totalFailedAssignments}
          description="My unsuccessful assignments"
          icon={CircleX}
        // color="red"
        />
      </AnalyticsSection>


      <AnalyticsSection
        title="Financial Overview"
        description="Summary of income and refunded amounts."
      >
        <AnalyticsCard
          title="Total Income"
          value={formatCurrency(analytics.totalTechnicianEarnings)}
          description="Total recorded income till now"
          icon={Wallet}
        // color="green"
        />

        <AnalyticsCard
          title="Total Refunded"
          value={formatCurrency(analytics.totalTechnicianRefunded)}
          description="Total refunded amount till now"
          icon={RefreshCcw}
        // color="yellow"
        />
      </AnalyticsSection>
    </div>
  );
}
