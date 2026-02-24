import type { UUID } from 'crypto';
import type { RelativeLighting } from './data-types.ts';

export const tableName = 'Region';
export const pkColumn = 'RegionId';

export interface Region {
	RegionId: UUID;
	RegionTemplateId: UUID | null;
	MapId: UUID;
	Name: string;
	Lighting: RelativeLighting;
}
