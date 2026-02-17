import type { UUID } from 'crypto';

export const tableName = 'RegionShape';
export const pkColumn = 'RegionShapeId';

export interface RegionShape {
	RegionShapeId: UUID;
	RegionId: UUID;
	ShapeType: string;
	Coords: string;
}
