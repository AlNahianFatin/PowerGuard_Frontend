import type { Area } from "./area.type";
import type { Assignment } from "./assignment.type";
import type { Customer } from "./customer.type";
import type { DistributionZone } from "./distribution-zone.type";
import type { Feeder } from "./feeder.type";
import type { Operator } from "./operator.type";
import type { Schedule } from "./schedule.type";
import type { ServiceRequest } from "./service-request.type";
import type { Substation } from "./substation.type";
import type { Technician } from "./technician.type";
import type { TechnicianReport } from "./technician-report.type";

export type Role = "ADMIN" | "OPERATOR" | "TECHNICIAN" | "CUSTOMER";

export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

export type AuthProvider = "GOOGLE" | "CREDENTIAL";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;

  googleId?: string;
  authProvider: AuthProvider;
  emailVerified: boolean;
  needPasswordChange: boolean;

  imageUrl?: string;
  imagePublicId?: string;

  isDeleted: boolean;
  deletedAt?: string;

  createdAt: string;
  updatedAt: string;

  operator?: Operator;
  technician?: Technician;
  customer?: Customer;

  reviewers?: Technician[];
  areas: Area[];
  distributionZones: DistributionZone[];
  feeders: Feeder[];
  substations: Substation[];
  deletedAssignmentByUser: Assignment[];
  assignedByUser: Assignment[]
  rejectedServiceRequests: ServiceRequest[];
  deletedScheduleByUser: Schedule[];
  createdByUser: Schedule[];
  technicianReports: TechnicianReport[];
}
