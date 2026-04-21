import type { UUID } from 'crypto';
import type { MapStub } from './map.ts';

// Commands

export interface CreateCampaign {
	name: string;
}

export interface CreateCampaignRequest {
	domain: 'Campaign';
	commandType: 'Create';
	command: CreateCampaign;
}

export interface UpdateCampaign {
	id: UUID;
	name?: string;
	activeMapId?: UUID;
}

export interface UpdateCampaignRequest {
	domain: 'Campaign';
	commandType: 'Update';
	command: UpdateCampaign;
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
