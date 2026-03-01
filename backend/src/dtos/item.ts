import type { UUID } from 'crypto';
import type { ActionStub } from './action.ts';
import type { Value } from './data-types.ts';

interface LocationItemStubBase {
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

interface ContainerStub extends LocationItemStubBase {
	isContainer: true;
	containedItems: LocationItemStub[];
}

interface NonContainerStub extends LocationItemStubBase {
	isContainer: false;
}

export type LocationItemStub = ContainerStub | NonContainerStub;
