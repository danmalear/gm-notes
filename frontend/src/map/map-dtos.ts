import type { RegionStub } from '#region/region-dtos.ts';
import type { Lighting } from '#shared/data/data-types.ts';
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
	regions: RegionStub[];
}

export interface MapStub {
	id: UUID;
	campaignId: UUID;
	name: string;
	imagePath: string;
}
