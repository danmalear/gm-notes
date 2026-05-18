import type { RegionStubWithShapes } from '#region/region-dtos.ts';
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

/**
 * Hydrated and flattened response structure for maps.
 * Useful for showing all relevant data for one record.
 */
export interface MapResponse {
	id: UUID;
	name: string;
	imagePath: string;
	defaultLighting: Lighting;
	width: number;
	height: number;
	regions: RegionStubWithShapes[];
}

/**
 * Minimal response structure for maps.
 * Useful for showing basic information in a list or as part of a parent object.
 */
export interface MapStub {
	id: UUID;
	campaignId: UUID;
	name: string;
	imagePath: string;
}
