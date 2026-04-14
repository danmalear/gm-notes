import type { CampaignStub } from '#campaign/campaign-queries.ts';
import type { Lighting } from '#dtos/data-types.ts';
import type { RegionStub } from '#dtos/region.ts';
import type { UUID } from 'crypto';

export interface MapCreate {
	campaignId: UUID;
	name: string;
	imagePath: string;
	defaultLighting?: Lighting;
	width: number;
	height: number;
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
	width: number;
	height: number;
	campaign: CampaignStub;
	regions: RegionStub[];
}

export interface MapStub {
	id: UUID;
	campaignId: UUID;
	name: string;
	imagePath: string;
}
