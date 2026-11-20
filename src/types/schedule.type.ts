import type { Feeder } from "./feeder.type";
import type { User } from "./user.type";

export type ScheduleStatus = "DRAFT" | "PUBLISHED" | "COMPLETED";

export interface Schedule {
  id: string;
  
  startDateTime: string;
  endDateTime: string;

  reason: string;
  status: ScheduleStatus;

  createdAt: string;
  updatedAt: string;

  isDeleted: boolean;
  deletedBy?: string;
  deletedByUser?: User;
  deletedAt?: string;

  feederId: string;
  feeder: Feeder;
  
  creatorId: string;
  createdByUser: User;

  message: string | null;
}

export interface ScheduleParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  status?: ScheduleStatus;
  searchTerm?: string;
}

export interface CreateSchedulePayload {
  startDateTime: string;
  endDateTime: string;
  reason: string;
  feederId: string;
}

export interface UpdateSchedulePayload {
  startDateTime?: string;
  endDateTime?: string;
  reason?: string;
  feederId?: string;
}