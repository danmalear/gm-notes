import type { MapStub } from '#map/map-dtos.ts';
import type { UUID } from 'crypto';

/**
 * Hydrated and flattened response structure for campaigns.
 * Useful for showing all relevant data for one record.
 */
export interface CampaignResponse {
	id: UUID;
	name: string;
	activeMapId?: UUID;
	maps: MapStub[];
}

/**
 * Minimal response structure for campaigns.
 * Useful for showing basic information in a list or as part of a parent object.
 */
export interface CampaignStub {
	id: UUID;
	name: string;
	activeMapId?: UUID;
}
