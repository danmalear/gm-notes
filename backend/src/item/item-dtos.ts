import type { ActionStub } from '#action/action-dtos.ts';
import type { Value } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

interface LocationItemResponseBase {
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

interface ContainerStub extends LocationItemResponseBase {
	isContainer: true;
	containedItems: LocationItemResponse[];
}

interface NonContainerStub extends LocationItemResponseBase {
	isContainer: false;
}

export type LocationItemResponse = ContainerStub | NonContainerStub;
