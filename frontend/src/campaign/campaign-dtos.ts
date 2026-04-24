import type { MapStub } from '#map/map-dtos.ts';
import type { UUID } from 'crypto';

// Commands

export interface CreateCampaign {
	name: string;
}

export interface CreateCampaignRequest {
	context: 'Campaign';
	commandType: 'Create';
	commandData: CreateCampaign;
}

export interface UpdateCampaign {
	id: UUID;
	name?: string;
	activeMapId?: UUID;
}

export interface UpdateCampaignRequest {
	context: 'Campaign';
	commandType: 'Update';
	commandData: UpdateCampaign;
}

// Queries

export interface CampaignResponse {
	id: UUID;
	name: string;
	activeMapId?: UUID;
	maps: MapStub[];
}

export interface CampaignStub {
	id: UUID;
	name: string;
	activeMapId?: UUID;
}
