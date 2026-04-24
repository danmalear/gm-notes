import type { Shape } from '#region/region-dtos.ts';
import type { ShapeType } from '#region/RegionShape.ts';

export const isCircle = (shape: Shape) => 'r' in shape;
export const isRectangle = (shape: Shape) => 'x1' in shape;
export const isPolygon = (shape: Shape) => 'coords' in shape;

export function getShapeType(shape: Shape): ShapeType {
	if (isCircle(shape)) {
		return 'Circle';
	} else if (isRectangle(shape)) {
		return 'Rectangle';
	} else if (isPolygon(shape)) {
		return 'Polygon';
	} else {
		throw Error('Invalid shape type specified');
	}
}
