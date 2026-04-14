import type { RelativeLighting } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

export const tableName = 'Region';
export const pkColumn = 'RegionId';

export interface Region {
	RegionId: UUID;
	RegionTemplateId: UUID | null;
	MapId: UUID;
	Name: string;
	Lighting: RelativeLighting;
}
