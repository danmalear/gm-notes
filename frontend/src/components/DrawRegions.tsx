import type { Rectangle } from '#dtos/region.ts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { drawRectangle } from '../helpers/draw-shapes.ts';

export interface MapCanvasProps extends React.PropsWithChildren {
	x?: number;
	y?: number;
	w?: number;
	h?: number;
	isAddingNewRectangle: boolean;
	onRectangleDrawn: (rectangle: Rectangle) => void;
}

const MapCanvas: React.FC<MapCanvasProps> = ({
	x = 0,
	y = 0,
	w = 0,
	h = 0,
	isAddingNewRectangle,
	onRectangleDrawn,
}) => {
	const canvas = useRef<HTMLCanvasElement | null>(null);
	if (!canvas) {
		throw Error('ERROR: Region canvas not found');
	}
	const context = canvas.current?.getContext('2d');
	if (context) {
		context.strokeStyle = 'green';
		context.lineWidth = 15;
	}

	const offsetStyle: React.CSSProperties = {
		position: 'absolute',
		left: x,
		top: y,
	};

	const [rectangle, setRectangle] = useState<Rectangle | null>(null);

	const clearCanvas = useCallback(() => {
		if (!context) {
			console.error('ERROR: clearCanvas called in an invalid UI state.');
			return;
		}
		context?.clearRect(0, 0, w, h);
	}, [context, w, h]);

	useEffect(() => {
		if (isAddingNewRectangle) {
			// @TODO this is just for testing
			setRectangle({
				x1: 500,
				y1: 500,
				x2: 700,
				y2: 700,
			});
		}
	}, [isAddingNewRectangle]);

	useEffect(() => {
		// @TODO this is for testing
		if (context && rectangle && 'x1' in rectangle) {
			drawRectangle(context, rectangle);
			setTimeout(() => {
				onRectangleDrawn(rectangle);
				setRectangle(null);
				clearCanvas();
			}, 2000);
		}
	}, [rectangle, context, onRectangleDrawn, clearCanvas]);

	return (
		<canvas
			ref={canvas}
			style={{
				zIndex: 1,
				...offsetStyle,
			}}
			height={h}
			width={w}
		/>
	);
};

export default MapCanvas;
