import type { UUID } from 'crypto';
import type { MapStub } from './map.ts';

// Commands

export interface CreateCampaign {
	name: string;
}

export interface CampaignUpdate {
	id: UUID;
	name?: string;
	activeMapId?: UUID;
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
