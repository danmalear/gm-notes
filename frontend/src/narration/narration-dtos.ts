import type { UUID } from 'crypto';

/**
 * Valid query parameters for selecting multiple narrations
 */
export interface NarrationQueryParams {
	regionId?: UUID;
}

/**
 * Hydrated and flattened response structure for narrations.
 * Useful for showing all relevant data for one record.
 */
export interface NarrationResponse {
	id: UUID;
	name: string;
	description: string;
	isRead: boolean;
}

/**
 * Minimal response structure for narrations.
 * Useful for showing basic information in a list or as part of a parent object.
 */
export interface NarrationStub {
	id: UUID;
	name: string;
	isRead: boolean;
}
