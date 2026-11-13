import type { User } from "./user.type";

export type TechnicianStatus = "AVAILABLE" | "ASSIGNED";

export type TechnicianVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Technician {
  id: string;
  name: string;
  email: string;
  address?: string;

  status: TechnicianStatus;

  experienceYears: number;

  bio?: string;

  contactNumber?: string;

  verificationStatus: TechnicianVerificationStatus;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewer?: User;
  reviewedAt?: string;

  resume?: string;
  resumePublicId?: string;

  additionalFiles?: { url: string; publicId: string }[];

  isDeleted: boolean;
  deletedAt?: null;

  createdAt: string;
  updatedAt: string;

  userId: string;
  user: User;
}

export interface TechnicianParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  status?: TechnicianStatus;
  email?: string;
  verificationStatus?: TechnicianVerificationStatus;
  searchTerm?: string;
}

export interface AvailableTechnicianParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  searchTerm?: string;
}

export interface TechnicianApplicationData {
  user: {
    name: string;
    email: string;
  };
  technician: {
    address?: string;
    experienceYears: number;
    bio?: string;
    contactNumber?: string;
  };
}

export interface TechnicianApplicationPayload {
  resume: File;
  additionalFiles: File[];
  data: TechnicianApplicationData;
}

export interface ApproveTechnicianPayload {
  technicianId: string;
  verificationStatus: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}

export interface PublicTechnicianProfile {
  id: string;
  name: string;

  status: TechnicianStatus;

  experienceYears: number;

  bio?: string;

  contactNumber?: string;
  createdAt: string;
}

// export interface PublicTechnicianParams {
//   page?: number;
//   limit?: number;
//   searchTerm?: string;
//   specialization?: string;
//   sortBy?: string;
//   sortOrder?: "desc" | "asc";
// }
