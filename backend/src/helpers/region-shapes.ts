import type { Shape } from '#dtos/region.ts';
import type { UUID } from 'crypto';
import type { ShapeType } from '../entities/RegionShape.ts';
import { regionShapeRepository } from '../repositories.ts';
import {
	validateCircle,
	validatePolygon,
	validateRectangle,
} from './validation/shapes.ts';

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

export async function buildShapes(regionId: UUID) {
	const shapes = await regionShapeRepository.getByRegionId(regionId);

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
