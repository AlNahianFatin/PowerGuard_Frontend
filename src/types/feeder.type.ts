import type { Area } from "./area.type";
import type { Schedule } from "./schedule.type";
import type { Substation } from "./substation.type";
import type { User } from "./user.type";

export interface Feeder {
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

    substationId: string;
    substation: Substation;

    areas: Area[]
    schedules: Schedule[]
}

export interface CreateFeederPayload {
    name: string;
    code: string;
    description?: string;
    substationId: string;
}

export interface UpdateFeederPayload {
    name?: string;
    code?: string;
    description?: string;
    substationId?: string;
    areaIds?: string[];
}