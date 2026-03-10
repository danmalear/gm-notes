import type {
	Circle,
	Coords,
	Polygon,
	Rectangle,
	Shape,
} from '#dtos/region.ts';
import type { UUID } from 'crypto';
import { regionShapeRepository } from '../repositories.ts';

function validateCircle(circle: unknown): asserts circle is Circle {
	if (
		!circle ||
		typeof circle !== 'object' ||
		!('x' in circle) ||
		typeof circle.x !== 'number' ||
		!('y' in circle) ||
		typeof circle.y !== 'number' ||
		!('r' in circle) ||
		typeof circle.r !== 'number'
	) {
		throw Error('Corrupt circle record');
	}
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

function validateCoords(
	coordsArray: unknown[],
): asserts coordsArray is Coords[] {
	for (const coords of coordsArray) {
		if (
			!coords ||
			typeof coords !== 'object' ||
			!('x' in coords) ||
			typeof coords.x !== 'number' ||
			!('y' in coords) ||
			typeof coords.y !== 'number'
		) {
			throw Error('Corrupt coords record');
		}
	}
}

function validatePolygon(polygon: unknown): asserts polygon is Polygon {
	if (
		!polygon ||
		typeof polygon !== 'object' ||
		!('coords' in polygon) ||
		!Array.isArray(polygon.coords) ||
		!polygon.coords.length
	) {
		throw Error('Corrupt polygon record');
	}
	validateCoords(polygon.coords);
}

export async function buildShapes(regionId: UUID) {
	const shapes = await regionShapeRepository.getByRegionId(regionId);

	const dtoShapes: Shape[] = [];

	for (const shape of shapes) {
		const coords = JSON.parse(shape.Coords);
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
