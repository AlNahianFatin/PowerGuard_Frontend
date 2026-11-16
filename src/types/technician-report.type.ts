import type { Assignment } from "./assignment.type";
import type { User } from "./user.type";

export interface TechnicianReport {
  id: string;

  diagnosis: string;
  charge: string;

  createdAt: string;
  updatedAt: string;

  isDeleted: boolean;
  deletedBy?: string;
  deletedByUser?: User;
  deletedAt?: string;

  assignmentId?: string;
  assignment?: Assignment;
}

export interface TechnicianReportParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  isDeleted?: boolean;
  searchTerm?: string;
}

export interface SubmitTechnicianReportPayload {
  diagnosis: string;
  charge: number;
}

export interface UpdateTechnicianReportPayload {
  diagnosis?: string;
  charge?: number;
}