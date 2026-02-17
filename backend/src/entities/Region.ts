import type { UUID } from 'crypto';
import { RegionShape } from './RegionShape.ts';

export const tableName = 'Region';
export const pkColumn = 'RegionId';

export interface Region {
	RegionId: UUID;
	RegionTemplateId: UUID | null;
	MapId: UUID;
	Name: string;
}

export interface RegionWithShapes extends Region {
	RegionShapes: RegionShape[];
}
