import type {
	Circle,
	Coords,
	Polygon,
	Rectangle,
	Shape,
} from '#dtos/region.ts';

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

export const makeCoordsRelative = <T extends Shape, R = ShapeIdentity<T>>(
	img: HTMLImageElement,
	shape: T,
): R => {
	if (isCircle(shape)) {
		const { x, y, r } = shape;

		return {
			x: (x / img.naturalWidth) * img.width,
			y: (y / img.naturalHeight) * img.height,
			r: (r / img.naturalWidth) * img.width,
		} as R;
	}
	if (isRectangle(shape)) {
		const { x1, y1, x2, y2 } = shape;

		return {
			x1: (x1 / img.naturalWidth) * img.width,
			y1: (y1 / img.naturalHeight) * img.height,
			x2: (x2 / img.naturalWidth) * img.width,
			y2: (y2 / img.naturalHeight) * img.height,
		} as R;
	}
	if (isPolygon(shape)) {
		const { coords } = shape;

		return {
			coords: coords.map((pair) => ({
				x: (pair.x / img.naturalWidth) * img.width,
				y: (pair.y / img.naturalHeight) * img.height,
			})),
		} as R;
	}
	throw Error('Invalid shape specified');
};

export const makeCoordsStatic = <T extends Shape, R = ShapeIdentity<T>>(
	img: HTMLImageElement,
	shape: T,
): R => {
	if (isCircle(shape)) {
		const { x, y, r } = shape;

		return {
			x: (x / img.width) * img.naturalWidth,
			y: (y / img.height) * img.naturalHeight,
			r: (r / img.width) * img.naturalWidth,
		} as R;
	}
	if (isRectangle(shape)) {
		const { x1, y1, x2, y2 } = shape;

		return {
			x1: (x1 / img.width) * img.naturalWidth,
			y1: (y1 / img.height) * img.naturalHeight,
			x2: (x2 / img.width) * img.naturalWidth,
			y2: (y2 / img.height) * img.naturalHeight,
		} as R;
	}
	if (isPolygon(shape)) {
		const { coords } = shape;
		return {
			coords: coords.map((pair) => ({
				x: (pair.x / img.width) * img.naturalWidth,
				y: (pair.y / img.height) * img.naturalHeight,
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

export const isWithinRectangle = (coords: Coords, rectangle: Rectangle) => {
	const { x, y } = coords;
	const minX = Math.min(rectangle.x1, rectangle.x2);
	const maxX = Math.max(rectangle.x1, rectangle.x2);
	const minY = Math.min(rectangle.y1, rectangle.y2);
	const maxY = Math.max(rectangle.y1, rectangle.y2);
	return x >= minX && x <= maxX && y >= minY && y <= maxY;
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
