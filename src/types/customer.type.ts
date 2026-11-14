import type { ServiceRequest } from "./service_request.type";
import type { User } from "./user.type";

export interface Customer {
  id: string;
  name: string;
  email: string;
  contactNumber?: string;
  address?: string;

  isDeleted: boolean;
  deletedAt?: string;

  createdAt: string;
  updatedAt: string;

  userId: string;
  user: User;

  serviceRequest: ServiceRequest[]
}

export interface CustomerParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  email?: string;
  searchTerm?: string;
}

export interface CustomerAnalyticsResponse {
  totalServiceRequests: number;
  cancelledServiceRequests: number;
  rejectedServiceRequests: number;
  failedServiceRequests: number;
  resolvedServiceRequests: number;
  totalAmountSpent: number;
  totalRefunded: number;
}