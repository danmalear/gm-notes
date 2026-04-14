import type { UUID } from 'crypto';

export const tableName = 'LocationItem';
export const pkColumn = 'LocationItemId';
export const locationIdColName = 'LocationId';
export const itemIdColName = 'ItemId';

export interface LocationItem {
	LocationItemId: UUID;
	LocationId: UUID;
	ItemId: UUID;
	Quantity: number;
}
