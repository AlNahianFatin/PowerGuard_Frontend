import type { Area } from "./area.type";
import type { Assignment } from "./assignment.type";
import type { Customer } from "./customer.type";
import type { User } from "./user.type";

export type ServiceRequestStatus = "PENDING" | "ASSIGNED" | "INSPECTING" | "PAYMENTPENDING" | "INPROGRESS" | "RESOLVED" | "FAILED" | "REJECTED" | "CANCELLED";

export interface ServiceRequest {
  id: string;
  title: string;
  description?: string;

  status: ServiceRequestStatus;

  failureNote?: string;

  rejectionReason?: string;
  rejectedBy?: string;
  rejectedByUser?: User;

  assignedAt?: string;
  inspectedAt?: string;
  resolvedAt?: string;

  createdAt: string;
  updatedAt: string;

  isDeleted: boolean;
  deletedAt?: string;

  customerId: string;
  customer: Customer;

  areaId: string;
  area: Area;

  assignment?: Assignment;
}

export interface ServiceRequestParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  status?: ServiceRequestStatus;
  isCancelled?: boolean;
  isRejected?: boolean;
  isFailed?: boolean;
  isResolved?: boolean;
  isDeleted?: boolean;
  searchTerm?: string;
}

export interface SubmitRequestPayload {
  title: string;
  areaId: string;
  description?: string;
}

export interface UpdateRequestPayload {
  title?: string;
  areaId?: string;
  description?: string;
}

export interface CancelRequestParams {
  requestId: string;
}

export interface RejectRequestPayload {
  rejectionReason: string;
}