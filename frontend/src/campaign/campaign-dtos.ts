import type { MapStub } from '#map/map-dtos.ts';
import type { UUID } from 'crypto';

// Commands

export interface CreateCampaignData {
	name: string;
}

export interface CreateCampaign {
	context: 'CampaignCommand';
	type: 'Create';
	data: CreateCampaignData;
}

export interface UpdateCampaignData {
	id: UUID;
	name?: string;
	activeMapId?: UUID;
}

export interface UpdateCampaign {
	context: 'CampaignCommand';
	commandType: 'Update';
	commandData: UpdateCampaignData;
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
