import type { Shape } from '#region/region-dtos.ts';
import type { RegionShape, ShapeType } from '#region/RegionShape.ts';
import {
	validateCircle,
	validatePolygon,
	validateRectangle,
} from '#shared/validation/shapes.ts';

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

export async function buildShapes(shapes: RegionShape[]) {
	const dtoShapes: Shape[] = [];

	for (const shape of shapes) {
		const coords = shape.Coords;
		switch (shape.ShapeType) {
			case 'Circle':
				validateCircle(coords);
				dtoShapes.push(coords);
				break;
			case 'Rectangle':
				validateRectangle(coords);
				dtoShapes.push(coords);
				break;
			case 'Polygon':
				validatePolygon(coords);
				dtoShapes.push(coords);
				break;
			default:
				throw Error('Invalid shape stored on region');
		}
	}

	return dtoShapes;
}
