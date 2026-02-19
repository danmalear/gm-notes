import type { UUID } from 'crypto';

export const tableName = 'RegionNarration';
export const pkColumns = ['RegionId', 'NarrationId'];
export const regionIdColName = 'RegionId';
export const narrationIdColName = 'NarrationId';

export interface RegionNarration {
	RegionId: UUID;
	NarrationId: UUID;
}
