import type { UUID } from 'crypto';

export const tableName = 'RegionShape';
export const pkColumn = 'RegionShapeId';

export type ShapeType = 'Rectangle' | 'Circle' | 'Polygon';

export interface RegionShape {
	RegionShapeId: UUID;
	RegionId: UUID;
	ShapeType: ShapeType;
	Coords: object;
}
