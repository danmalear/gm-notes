import type { UUID } from 'crypto';
import type { Item } from './Item.ts';

export const tableName = 'LocationItem';
export const pkColumn = 'LocationItemId';
export const locationIdColName = 'LocationId';
export const itemIdColName = 'ItemId';

export interface LocationItemRaw {
	LocationItemId: UUID;
	LocationId: UUID;
	ItemId: UUID;
	Quantity: number;
}

export interface LocationItem extends Item, LocationItemRaw {
	ContainedItems: LocationItemRaw[];
}
