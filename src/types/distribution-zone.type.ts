import type { Substation } from "./substation.type";
import type { User } from "./user.type";

export interface DistributionZone {
    id: string;
    name: string;
    code: string;
    description?: string;

    createdAt: string;
    updatedAt: string;

    isDeleted: boolean;
    deletedBy?: string;
    deletedByUser?: User;
    deletedAt?: string;

    substations: Substation[]
}

export interface CreateDistributionZonePayload {
    name: string;
    code: string;
    description?: string;
}

export interface UpdateDistributionZonePayload {
    name?: string;
	code?: string;
	description?: string;
	substationIds?: string[];
}