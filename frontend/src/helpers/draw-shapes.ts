import type { Coords, Rectangle, Shape } from '#dtos/region.ts';

export const makeCoordsRelative = (img: HTMLImageElement, shape: Shape) => {
	const isCircle = 'r' in shape;
	const isRect = 'x1' in shape;
	const isPoly = 'coords' in shape;
	if (isCircle) {
		const { x, y, r } = shape;

		const relativeX = (x / img.naturalWidth) * img.width;
		const relativeY = (y / img.naturalHeight) * img.height;
		const relativeR = (r / img.naturalWidth) * img.width;

		return `${relativeX},${relativeY},${relativeR}`;
	}
	if (isRect) {
		const { x1, y1, x2, y2 } = shape;

		const relativeX1 = (x1 / img.naturalWidth) * img.width;
		const relativeY1 = (y1 / img.naturalHeight) * img.height;
		const relativeX2 = (x2 / img.naturalWidth) * img.width;
		const relativeY2 = (y2 / img.naturalHeight) * img.height;
		return `${relativeX1},${relativeY1},${relativeX2},${relativeY2}`;
	}
	if (isPoly) {
		const { coords } = shape;

		const coordsStrings: string[] = [];
		for (const pair of coords) {
			const { x, y } = pair;
			const relativeX = (x / img.naturalWidth) * img.width;
			const relativeY = (y / img.naturalHeight) * img.height;
			coordsStrings.push(`${relativeX},${relativeY}`);
		}
		return coordsStrings.join(',');
	}
	return '';
};

export const makeCoordsStatic = (
	img: HTMLImageElement,
	shape: Shape,
): Shape => {
	const isCircle = 'r' in shape;
	const isRect = 'x1' in shape;
	const isPoly = 'coords' in shape;
	if (isCircle) {
		const { x, y, r } = shape;

		return {
			x: (x / img.width) * img.naturalWidth,
			y: (y / img.height) * img.naturalHeight,
			r: (r / img.width) * img.naturalWidth,
		};
	}
	if (isRect) {
		const { x1, y1, x2, y2 } = shape;

		return {
			x1: (x1 / img.width) * img.naturalWidth,
			y1: (y1 / img.height) * img.naturalHeight,
			x2: (x2 / img.width) * img.naturalWidth,
			y2: (y2 / img.height) * img.naturalHeight,
		};
	}
	if (isPoly) {
		const { coords } = shape;

		const coordsStrings: Coords[] = [];
		for (const pair of coords) {
			const { x, y } = pair;
			coordsStrings.push({
				x: (x / img.width) * img.naturalWidth,
				y: (y / img.height) * img.naturalHeight,
			});
		}
		return { coords };
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
