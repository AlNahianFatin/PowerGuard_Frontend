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

import { useGetCustomerAnalytics } from "@/hooks";
import AnalyticsCard from "../analytics-card";
import AnalyticsSection from "../analytics-section";
import type { CustomerAnalyticsResponse } from "@/types";
import CustomerAnalyticsLoading from "./customer-analytics-loading";
import { formatCurrency } from "@/utils/currency-format.util";

export default function CustomerAnalytics() {
  const { data, isLoading } = useGetCustomerAnalytics();

  const results = data?.data;

  const analytics: CustomerAnalyticsResponse = results ?? {
    totalServiceRequests: 0,
    cancelledServiceRequests: 0,
    rejectedServiceRequests: 0,
    failedServiceRequests: 0,
    resolvedServiceRequests: 0,
    totalAmountSpent: 0,
    totalRefunded: 0,
  };

  if (isLoading) {
    return <CustomerAnalyticsLoading />
  }

  return (
    <div className="w-full space-y-10">
      <AnalyticsSection
        title="My Service Requests Overview"
        description="Summary of service requests."
      >
        <AnalyticsCard
          title="Total Service Requests"
          value={analytics.totalServiceRequests}
          description="All requested services"
          icon={ClipboardList}
        // color="blue"
        />

        <AnalyticsCard
          title="Resolved Service Requests"
          value={analytics.resolvedServiceRequests}
          description="Service requests completed successfully"
          icon={CheckCheck}
        // color="green"
        />

        <AnalyticsCard
          title="Cancelled Service Requests"
          value={analytics.cancelledServiceRequests}
          description="Service requests cancelled by me"
          icon={Ban}
        // color="red"
        />

        <AnalyticsCard
          title="Rejected Service Requests"
          value={analytics.rejectedServiceRequests}
          description="Service requests rejected by admin/operator"
          icon={ClipboardX}
        // color="red"
        />

        <AnalyticsCard
          title="Failed Service Requests"
          value={analytics.failedServiceRequests}
          description="Technician failed to resolve service requests"
          icon={CircleX}
        // color="red"
        />
      </AnalyticsSection>


      <AnalyticsSection
        title="Financial Overview"
        description="Summary of expenditure and refunded amounts."
      >
        <AnalyticsCard
          title="Total Revenue"
          value={formatCurrency(analytics.totalAmountSpent)}
          description="Total recorded expenditure"
          icon={Wallet}
        // color="green"
        />

        <AnalyticsCard
          title="Total Refunded"
          value={formatCurrency(analytics.totalRefunded)}
          description="Total refunded amount"
          icon={RefreshCcw}
        // color="yellow"
        />
      </AnalyticsSection>
    </div>
  );
}
