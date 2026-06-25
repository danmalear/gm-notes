import { toStub as actionToStub } from '#action/action-mappers.ts';
import { toStub as handoutToStub } from '#handout/handout-mappers.ts';
import { toStub as locationItemToStub } from '#item/location-item-mappers.ts';
import { toStub as narrationToStub } from '#narration/narration-mappers.ts';
import type { RegionShapeModel } from '#prisma-models/RegionShape.ts';
import {
	validateCircle,
	validatePolygon,
	validateRectangle,
} from '#region/shape-validators.ts';
import type {
	RegionResponse,
	RegionStub,
	RegionStubWithShapes,
	Shape,
} from './region-dtos.ts';
import type {
	RegionRec,
	RegionRecShapes,
	RegionRefRec,
} from './region-repository.ts';

export function shapeToStub(shape: RegionShapeModel): Shape {
	const coords = shape.Coords;
	switch (shape.ShapeType) {
		case 'Circle':
			validateCircle(coords);
			return coords;
		case 'Rectangle':
			validateRectangle(coords);
			return coords;
		case 'Polygon':
			validatePolygon(coords);
			return coords;
		default:
			throw Error('Invalid shape stored on region');
	}
}

export function toDto(region: RegionRefRec) {
	const regionResponse: RegionResponse = {
		id: region.RegionId,
		mapId: region.MapId,
		name: region.Name,
		shapes: region.Shapes.map(shapeToStub),
		lighting: region.Lighting,
		narrations: region.Narrations.map(narrationToStub),
		actions: region.Actions.map(actionToStub),
		items: region.Items.map(locationItemToStub),
		handouts: region.Handouts.map(handoutToStub),
		notes: region.Notes.map((note) => note.Description),
	};

	return regionResponse;
}

export function toStub(region: RegionRec) {
	const regionStub: RegionStub = {
		id: region.RegionId,
		mapId: region.MapId,
		name: region.Name,
	};

	return regionStub;
}

export function toStubWithShapes(region: RegionRecShapes) {
	const regionStub: RegionStubWithShapes = {
		id: region.RegionId,
		mapId: region.MapId,
		name: region.Name,
		shapes: region.Shapes.map(shapeToStub),
	};

	return regionStub;
}
