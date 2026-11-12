import type { Feeder } from "./feeder.type";
import type { ServiceRequest } from "./service_request.type";
import type { User } from "./user.type";

export interface Area {
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

    feederId: string;
    feeder: Feeder;

    serviceRequests: ServiceRequest[];
}

export interface CreateAreaPayload {
    name: string;
    code: string;
    description?: string;
    feederId: string;
}

export interface UpdateAreaPayload {
    name?: string;
    code?: string;
    description?: string;
    feederId?: string;
}