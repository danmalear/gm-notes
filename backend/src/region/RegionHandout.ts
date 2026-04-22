import type { UUID } from 'crypto';

export const tableName = 'RegionHandout';
export const pkColumns = ['RegionId', 'HandoutId'];
export const regionIdColName = 'RegionId';
export const handoutIdColName = 'HandoutId';

export interface RegionHandout {
	RegionId: UUID;
	HandoutId: UUID;
}
