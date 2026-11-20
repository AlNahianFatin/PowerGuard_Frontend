import type { Payment } from "./payment.type";
import type { ServiceRequest } from "./service-request.type";
import type { Technician } from "./technician.type";
import type { TechnicianReport } from "./technician-report.type";
import type { User } from "./user.type";

export interface Assignment {
  id: string;

  notes?: string;

  reportUrl?: string;
  reportPublicId?: string;

  createdAt: string;
  updatedAt: string;

  isDeleted: boolean;
  deletedBy?: string;
  deletedByUser?: User;
  deletedAt?: string;

  assigneeId: string
  assignedByUser: User;

  technicianId: string;
  technician?: Technician;

  serviceRequestId: string;
  serviceRequest: ServiceRequest;

  payment?: Payment;

  technicianReport?: TechnicianReport;
}

export interface AssignmentParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  isDeleted?: boolean;
  searchTerm?: string;
}

export interface MyAssignmentParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  searchTerm?: string;
}

export interface AssignTechnicianPayload {
  technicianId: string;
  notes?: string;
}

export interface AssignTechnicianResponse {
  id: string;
  notes: string;
  reportUrl: string;
  reportPublicId: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedBy: string;
  deletedAt: string;
  assigneeId: string;
  technicianId: string;
  serviceRequestId: string;
  technician: Technician;
}

export interface UpdateAssignmentPayload {
  technicianId?: string;
  notes?: string;
}

export interface UpdateAssignmentStatusPayload {
  status: "INSPECTING" | "RESOLVED" | "FAILED";
  failureNote?: string;
}
