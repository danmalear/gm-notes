import type {
	Circle,
	Coords,
	Polygon,
	Rectangle,
	Shape,
} from '#dtos/region.ts';

export type ShapeType = 'Rectangle' | 'Circle' | 'Polygon';

export const isCircle = (shape: Shape) => 'r' in shape;
export const isRectangle = (shape: Shape) => 'x1' in shape;
export const isPolygon = (shape: Shape) => 'coords' in shape;

// This is to ensure the makeCoords... functions return the correct types
type ShapeIdentity<T> = T extends Circle
	? Circle
	: T extends Rectangle
		? Rectangle
		: T extends Polygon
			? Polygon
			: never;

interface Dimensions {
	width: number;
	height: number;
}

export const scaleShape = <T extends Shape, R = ShapeIdentity<T>>(
	shape: T,
	scale: {
		from: Dimensions;
		to: Dimensions;
	},
): R => {
	const { from, to } = scale;
	if (isCircle(shape)) {
		const { x, y, r } = shape;

		return {
			x: (x / from.width) * to.width,
			y: (y / from.height) * to.height,
			r: (r / from.width) * to.width,
		} as R;
	}
	if (isRectangle(shape)) {
		const { x1, y1, x2, y2 } = shape;

		return {
			x1: (x1 / from.width) * to.width,
			y1: (y1 / from.height) * to.height,
			x2: (x2 / from.width) * to.width,
			y2: (y2 / from.height) * to.height,
		} as R;
	}
	if (isPolygon(shape)) {
		const { coords } = shape;

		return {
			coords: coords.map((pair) => ({
				x: (pair.x / from.width) * to.width,
				y: (pair.y / from.height) * to.height,
			})),
		} as R;
	}
	throw Error('Invalid shape specified');
};

export const stringifyCoords = (shape: Shape) => {
	if (isCircle(shape)) {
		const { x, y, r } = shape;
		return `${x},${y},${r}`;
	}
	if (isRectangle(shape)) {
		const { x1, y1, x2, y2 } = shape;

		return `${x1},${y1},${x2},${y2}`;
	}
	if (isPolygon(shape)) {
		const { coords } = shape;

		const coordsStrings: string[] = [];
		for (const pair of coords) {
			const { x, y } = pair;
			coordsStrings.push(`${x},${y}`);
		}
		return coordsStrings.join(',');
	} else {
		throw Error('Image not found in the DOM');
	}
};

export const isRectangleEqual = (rect1: Rectangle, rect2: Rectangle) => {
	return (
		rect1.x1 === rect2.x1 &&
		rect1.x2 === rect2.x2 &&
		rect1.y1 === rect2.y1 &&
		rect1.y2 === rect2.y2
	);
};

export const isWithinRectangle = (coords: Coords, rectangle: Rectangle) => {
	const { x, y } = coords;
	const minX = Math.min(rectangle.x1, rectangle.x2);
	const maxX = Math.max(rectangle.x1, rectangle.x2);
	const minY = Math.min(rectangle.y1, rectangle.y2);
	const maxY = Math.max(rectangle.y1, rectangle.y2);
	return x >= minX && x <= maxX && y >= minY && y <= maxY;
};

export const getRectanglePaths = (rectangle: Rectangle) => {
	const x1 = Math.min(rectangle.x1, rectangle.x2);
	const x2 = Math.max(rectangle.x1, rectangle.x2);

	const y1 = Math.min(rectangle.y1, rectangle.y2);
	const y2 = Math.max(rectangle.y1, rectangle.y2);

	const topLine = new Path2D();
	topLine.moveTo(x1, y1);
	topLine.lineTo(x2, y1);
	const bottomLine = new Path2D();
	bottomLine.moveTo(x1, y2);
	bottomLine.lineTo(x2, y2);
	const leftLine = new Path2D();
	leftLine.moveTo(x1, y1);
	leftLine.lineTo(x1, y2);
	const rightLine = new Path2D();
	rightLine.moveTo(x2, y1);
	rightLine.lineTo(x2, y2);
	return {
		topLine,
		bottomLine,
		leftLine,
		rightLine,
	};
};

export const drawRectangle = (
	context: CanvasRenderingContext2D,
	rectangle: Rectangle,
	fill = false,
) => {
	const x1 = Math.min(rectangle.x1, rectangle.x2);
	const x2 = Math.max(rectangle.x1, rectangle.x2);
	const width = x2 - x1;

	const y1 = Math.min(rectangle.y1, rectangle.y2);
	const y2 = Math.max(rectangle.y1, rectangle.y2);
	const height = y2 - y1;

	if (fill) {
		context.fillRect(x1, y1, width, height);
	} else {
		context.strokeRect(x1, y1, width, height);
	}
};
