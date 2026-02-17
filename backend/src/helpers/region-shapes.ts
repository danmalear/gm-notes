import type { Circle, Polygon, Rectangle } from '../dtos/Region.ts';
import type { RegionShape } from '../entities/RegionShape.ts';

function validateCircle(circle: unknown): asserts circle is Circle {
	// @TODO
}

function validateRectangle(rectangle: unknown): asserts rectangle is Rectangle {
	if (
		!rectangle ||
		typeof rectangle !== 'object' ||
		!('x1' in rectangle) ||
		typeof rectangle.x1 !== 'number' ||
		!('x2' in rectangle) ||
		typeof rectangle.x2 !== 'number' ||
		!('y1' in rectangle) ||
		typeof rectangle.y1 !== 'number' ||
		!('y2' in rectangle) ||
		typeof rectangle.y2 !== 'number'
	) {
		throw Error('Corrupt rectangle record');
	}
}

function validatePolygon(polygon: unknown): asserts polygon is Polygon {
	// @TODO
}

export function buildShapes(shapes: RegionShape[]) {
	const dtoShapes = {
		rectangles: [] as Rectangle[],
		circles: [] as Circle[],
		polygons: [] as Polygon[],
	};

	for (const shape of shapes) {
		const coords = JSON.parse(shape.Coords);
		switch (shape.ShapeType) {
			case 'Circle':
				validateCircle(coords);
				dtoShapes.circles.push(coords);
				break;
			case 'Rectangle':
				validateRectangle(coords);
				dtoShapes.rectangles.push(coords);
				break;
			case 'Polygon':
				validatePolygon(coords);
				dtoShapes.polygons.push(coords);
				break;
			default:
				throw Error('Invalid shape stored on region');
		}
	}

	return dtoShapes;
}
