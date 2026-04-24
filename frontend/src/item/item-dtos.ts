import type { ActionStub } from '#action/action-dtos.ts';
import type { Value } from '#shared/data/data-types.ts';
import type { UUID } from 'crypto';

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

export type LocationItemResponse = ContainerResponse | NonContainerResponse;

export interface LocationItemStub {
	id: UUID;
	locationId: UUID;
	itemId: UUID;
	name: string;
	quantity: number;
	isContainer: boolean;
}
