import type { UUID } from 'crypto';
import type { Value } from './data-types.ts';

export interface LocationItemStub {
	locationItemId: UUID;
	locationId: UUID;
	itemId: UUID;
	name: string;
	isContainer: boolean;
	value: Value;
	detailsLink: string;
	quantity: number;
}
