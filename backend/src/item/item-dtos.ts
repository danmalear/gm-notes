import type { ActionResponse } from '#action/action-dtos.ts';
import type { Value } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

interface LocationItemStubBase {
	id: UUID;
	locationId: UUID;
	itemId: UUID;
	name: string;
	value?: Value;
	detailsLink?: string;
	imageFileId?: string;
	quantity: number;
	actions: ActionResponse[];
	notes: string[];
}

interface ContainerStub extends LocationItemStubBase {
	isContainer: true;
	containedItems: LocationItemStub[];
}

interface NonContainerStub extends LocationItemStubBase {
	isContainer: false;
}

export type LocationItemStub = ContainerStub | NonContainerStub;
