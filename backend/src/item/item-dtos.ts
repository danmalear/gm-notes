import type { ActionStub } from '#action/action-dtos.ts';
import type { Value } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

/**
 * Starting point for LocationItemResponse. Lacks container fields.
 */
export interface LocationItemResponseBase {
	id: UUID;
	locationId: UUID;
	itemId: UUID;
	name: string;
	value?: Value;
	detailsLink?: string;
	imageFileId?: string;
	quantity: number;
	actions: ActionStub[];
	notes: string[];
}

interface ContainerResponse extends LocationItemResponseBase {
	isContainer: true;
	containedItems: LocationItemStub[];
}

interface NonContainerResponse extends LocationItemResponseBase {
	isContainer: false;
}

/**
 * Hydrated and flattened response structure for instances of items.
 * Useful for showing all relevant data for one record.
 */
export type LocationItemResponse = ContainerResponse | NonContainerResponse;

/**
 * Minimal response structure for instances of items.
 * Useful for showing basic information in a list or as part of a parent object.
 */
export interface LocationItemStub {
	id: UUID;
	locationId: UUID;
	itemId: UUID;
	name: string;
	quantity: number;
	isContainer: boolean;
}
