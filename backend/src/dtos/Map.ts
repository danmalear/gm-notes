import type { UUID } from 'crypto';
import type { CampaignStub } from './Campaign.ts';
import type { MapTemplateStub } from './MapTemplate.ts';
import type { RegionStub } from './Region.ts';
import type { Lighting } from './data-types.ts';

export interface MapCreate {
	campaignId: UUID;
	mapTemplateId?: UUID;
	name: string;
	imagePath: string;
	defaultLighting?: Lighting;
}

export interface MapUpdate {
	id: UUID;
	name?: string;
	imagePath?: string;
	defaultLighting?: Lighting;
}

export interface MapQueryParams {
	campaignId?: UUID;
}

export interface MapResponse {
	id: UUID;
	name: string;
	imagePath: string;
	defaultLighting: Lighting;
	campaign: CampaignStub;
	mapTemplate?: MapTemplateStub;
	regions: RegionStub[];
}

export interface MapStub {
	id: UUID;
	campaignId: UUID;
	mapTemplateId?: UUID;
	name: string;
	imagePath: string;
}
