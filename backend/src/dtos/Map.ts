import type { UUID } from 'crypto';
import type { CampaignStub } from './Campaign.ts';
import type { MapTemplateStub } from './MapTemplate.ts';
import type { RegionStub } from './Region.ts';

export interface MapCreate {
	campaignId: UUID;
	mapTemplateId?: UUID;
	name: string;
	imagePath: string;
}

export interface MapUpdate {
	id: UUID;
	name?: string;
	imagePath?: string;
}

export interface MapQueryParams {
	campaignId?: UUID;
}

export interface MapResponse {
	id: UUID;
	name: string;
	imagePath: string;
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
