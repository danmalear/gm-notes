import type { RelativeLighting } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

export const tableName = 'Region';
export const pkColumn = 'RegionId';

export interface RegionRaw {
	RegionId: UUID;
	RegionTemplateId: UUID | null;
	MapId: UUID;
	Name: string;
	Lighting: RelativeLighting;
}
