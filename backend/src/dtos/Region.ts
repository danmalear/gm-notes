import type { UUID } from 'crypto';

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

export interface RegionResponse {
	id: UUID;
	name: string;
	rectangles: Rectangle[];
	circles: Circle[];
	polygons: Polygon[];
	// @TODO Some of these might be their own files
	// lighting?: Lighting;
	// descriptions: Description[];
	// creatures?: Creature[];
	// checks?: AbilityCheck[];
	// items?: Item[];
	// opportunities?: string[];
	// handouts?: Handout[];
	// notes?: string[];
}

export interface RegionStub {
	id: UUID;
	name: string;
	rectangles: Rectangle[];
	circles: Circle[];
	polygons: Polygon[];
}
