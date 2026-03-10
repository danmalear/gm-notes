import type { Shape } from '#dtos/region.ts';
import type { UUID } from 'crypto';
import { regionShapeRepository } from '../repositories.ts';
import {
	validateCircle,
	validatePolygon,
	validateRectangle,
} from './validation/shapes.ts';

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
