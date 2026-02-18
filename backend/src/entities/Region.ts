import type { UUID } from 'crypto';
import type { RegionShape } from './RegionShape.ts';
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

export interface RegionWithShapes extends Region {
	RegionShapes: RegionShape[];
}
