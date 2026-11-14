import type { User } from "./user.type";

export interface Operator {
  id: string;
  name: string;
  email: string;
  address?: string;

  contactNumber?: string;

  resume?: string
  resumePublicId?: string;
  additionalFiles?: any;

  isDeleted: boolean;
  deletedAt?: string;

  createdAt: string;
  updatedAt: string;

  userId: string;
  user: User;
}

export interface OperatorParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  email?: string;
  searchTerm?: string;
}

export interface OperatorAnalyticsResponse {
  publishedSchedules: number;
  assignedAssignments: number;
  totalTechnicians: number;
  totalPendingTechnicianApplications: number;
  totalApprovedTechnicians: number;
  totalRejectedTechnicians: number;
  totalCustomers: number;
  totalAssignments: number;
  totalOngoingAssignments: number;
  totalCancelledAssignments: number;
  totalRejectedAssignments: number;
  totalFailedAssignments: number;
  totalResolvedAssignments:number;
}