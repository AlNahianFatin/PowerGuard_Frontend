import type { DistributionZone } from "./distribution_zone.type";
import type { Feeder } from "./feeder.type";
import type { User } from "./user.type";

export interface Substation {
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

    zoneId: string;
    zone: DistributionZone;

    feeders: Feeder[]
}

export interface CreateSubstationPayload {
    name: string;
    code: string;
    description?: string;
    zoneId: string;
}

export interface UpdateSubstationPayload {
    name?: string;
    code?: string;
    description?: string;
    zoneId?: string;
    feederIds?: string[];
}