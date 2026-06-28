import type { RegionStub } from '#region/region-dtos.ts';
import type { AbsoluteLightingDto } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

export interface MapCreate {
	campaignId: UUID;
	name: string;
	imagePath: string;
	defaultLighting?: AbsoluteLightingDto;
	width: number;
	height: number;
}

export interface MapUpdate {
	id: UUID;
	name?: string;
	imagePath?: string;
	defaultLighting?: AbsoluteLightingDto;
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
	campaignId: UUID;
	name: string;
	imagePath: string;
	defaultLighting: AbsoluteLightingDto;
	width: number;
	height: number;
	regions: RegionStub[];
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
