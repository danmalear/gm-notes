import { Rectangle } from '#dtos/region.ts';

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
