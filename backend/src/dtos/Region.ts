import type { UUID } from 'crypto';
import type { RelativeLighting } from './data-types.ts';
import type { LocationItemStub } from './item.ts';
import type { MapStub } from './map.ts';
import type { NarrationStub } from './narration.ts';
import type { RegionTemplateStub } from './region-template.ts';

export interface Rectangle {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export interface Circle {
	x: number;
	y: number;
	r: number;
}

export interface Coords {
	x: number;
	y: number;
}

export interface Polygon {
	coords: Coords[];
}

export type Shape = Rectangle | Circle | Polygon;

export interface RegionQueryParams {
	mapId?: UUID;
}

export interface RegionResponse {
	id: UUID;
	name: string;
	regionTemplate?: RegionTemplateStub;
	map: MapStub;
	rectangles: Rectangle[];
	circles: Circle[];
	polygons: Polygon[];
	lighting: RelativeLighting;
	narrations: NarrationStub[];
	// @TODO Some of these might be their own files
	// creatures?: Creature[];
	// checks?: AbilityCheck[];
	items: LocationItemStub[];
	// opportunities?: string[];
	// handouts?: Handout[];
	// notes?: string[];
}

export interface RegionStub {
	id: UUID;
	regionTemplateId?: UUID;
	mapId: UUID;
	name: string;
	rectangles: Rectangle[];
	circles: Circle[];
	polygons: Polygon[];
}
