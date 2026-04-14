import type { MapStub } from '#map/map-dtos.ts';
import type { UUID } from 'crypto';

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
