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
