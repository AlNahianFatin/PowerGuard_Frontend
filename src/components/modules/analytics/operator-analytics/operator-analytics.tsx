"use client";

import {
  Users,
  Wrench,
  Clock,
  CheckCircle2,
  XCircle,
  ClipboardList,
  Activity,
  Ban,
  CircleX,
  CheckCheck,
  ClipboardX,
  CalendarCheck,
} from "lucide-react";

import { useGetOperatorAnalytics } from "@/hooks";
import AnalyticsCard from "../analytics-card";
import AnalyticsSection from "../analytics-section";
import OperatorAnalyticsLoading from "./operator-analytics-loading";
import type { OperatorAnalyticsResponse } from "@/types";

export default function OperatorAnalytics() {
  const { data, isLoading } = useGetOperatorAnalytics();

  const results = data?.data;

  const analytics: OperatorAnalyticsResponse = results ?? {
    publishedSchedules: 0,
    assignedAssignments: 0,
    totalTechnicians: 0,
    totalPendingTechnicianApplications: 0,
    totalApprovedTechnicians: 0,
    totalRejectedTechnicians: 0,
    totalCustomers: 0,
    totalAssignments: 0,
    totalOngoingAssignments: 0,
    totalCancelledAssignments: 0,
    totalRejectedAssignments: 0,
    totalFailedAssignments: 0,
    totalResolvedAssignments: 0,
  };

  if (isLoading) {
    return <OperatorAnalyticsLoading />
  }

  return (
    <div className="w-full space-y-10">
      <AnalyticsSection
        title="User Overview"
        description="Summary of registered users."
      >
        <AnalyticsCard
          title="Total Technicians"
          value={analytics.totalTechnicians}
          description="Registered technicians"
          icon={Wrench}
        // color="green"
        />

        <AnalyticsCard
          title="Total Customers"
          value={analytics.totalCustomers}
          description="Registered customers"
          icon={Users}
        // color="default"
        />
      </AnalyticsSection>


      <AnalyticsSection
        title="Schedule Overview"
        description="Summary of power outage schedules."
      >
        <AnalyticsCard
          title="Published Schedules"
          value={analytics.publishedSchedules}
          description="Total published schedules"
          icon={CalendarCheck}
        />

        {/* <AnalyticsCard
          title="Total Operators"
          value={analytics.totalOperators}
          description="Registered operators"
          icon={UserCog}
        // color="purple"
        />

        <AnalyticsCard
          title="Total Technicians"
          value={analytics.totalTechnicians}
          description="Registered technicians"
          icon={Wrench}
        // color="green"
        />

        <AnalyticsCard
          title="Total Customers"
          value={analytics.totalCustomers}
          description="Registered customers"
          icon={Users}
        // color="default"
        /> */}
      </AnalyticsSection>


      <AnalyticsSection
        title="Assignment Overview"
        description="Monitor assignment activity and completion statistics."
      >
        <AnalyticsCard
          title="Total Assignments"
          value={analytics.totalAssignments}
          description="All created assignments"
          icon={ClipboardList}
        // color="blue"
        />

        <AnalyticsCard
          title="Ongoing Assignments"
          value={analytics.totalOngoingAssignments}
          description="Currently in progress"
          icon={Activity}
        // color="yellow"
        />

        <AnalyticsCard
          title="Resolved Assignments"
          value={analytics.totalResolvedAssignments}
          description="Successfully completed"
          icon={CheckCheck}
        // color="green"
        />

        <AnalyticsCard
          title="Cancelled Assignments"
          value={analytics.totalCancelledAssignments}
          description="Cancelled assignments by customer"
          icon={Ban}
        // color="red"
        />

        <AnalyticsCard
          title="Rejected Assignments"
          value={analytics.totalRejectedAssignments}
          description="Rejected assignments by admin/operator"
          icon={ClipboardX}
        // color="red"
        />

        <AnalyticsCard
          title="Failed Assignments"
          value={analytics.totalFailedAssignments}
          description="Unsuccessful assignments by technician"
          icon={CircleX}
        // color="red"
        />
      </AnalyticsSection>


      <AnalyticsSection
        title="Technician Applications"
        description="Track technician registrations and verification progress."
      >
        <AnalyticsCard
          title="Pending Applications"
          value={analytics.totalPendingTechnicianApplications}
          description="Awaiting admin review"
          icon={Clock}
        // color="yellow"
        />

        <AnalyticsCard
          title="Approved Technicians"
          value={analytics.totalApprovedTechnicians}
          description="Successfully verified"
          icon={CheckCircle2}
        // color="green"
        />

        <AnalyticsCard
          title="Rejected Technicians"
          value={analytics.totalRejectedTechnicians}
          description="Rejected applications"
          icon={XCircle}
        // color="red"
        />
      </AnalyticsSection>
    </div>
  );
}
