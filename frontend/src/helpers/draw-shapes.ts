import type { Circle, Polygon, Rectangle, Shape } from '#dtos/region.ts';

const isCircle = (shape: Shape) => 'r' in shape;
const isRect = (shape: Shape) => 'x1' in shape;
const isPoly = (shape: Shape) => 'coords' in shape;

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
	if (isRect(shape)) {
		const { x1, y1, x2, y2 } = shape;

		return {
			x1: (x1 / img.naturalWidth) * img.width,
			y1: (y1 / img.naturalHeight) * img.height,
			x2: (x2 / img.naturalWidth) * img.width,
			y2: (y2 / img.naturalHeight) * img.height,
		} as R;
	}
	if (isPoly(shape)) {
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
	const isCircle = 'r' in shape;
	const isRect = 'x1' in shape;
	const isPoly = 'coords' in shape;
	if (isCircle) {
		const { x, y, r } = shape;

		return {
			x: (x / img.width) * img.naturalWidth,
			y: (y / img.height) * img.naturalHeight,
			r: (r / img.width) * img.naturalWidth,
		} as R;
	}
	if (isRect) {
		const { x1, y1, x2, y2 } = shape;

		return {
			x1: (x1 / img.width) * img.naturalWidth,
			y1: (y1 / img.height) * img.naturalHeight,
			x2: (x2 / img.width) * img.naturalWidth,
			y2: (y2 / img.height) * img.naturalHeight,
		} as R;
	}
	if (isPoly) {
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

export const drawRectangle = (
	context: CanvasRenderingContext2D,
	rectangle: Rectangle,
) => {
	const x1 = Math.min(rectangle.x1, rectangle.x2);
	const x2 = Math.max(rectangle.x1, rectangle.x2);
	const width = x2 - x1;

	const y1 = Math.min(rectangle.y1, rectangle.y2);
	const y2 = Math.max(rectangle.y1, rectangle.y2);
	const height = y2 - y1;

	context.strokeRect(x1, y1, width, height);
};
