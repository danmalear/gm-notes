import type { Rectangle } from '#dtos/region.ts';
import { MouseEvent, useCallback, useContext, useRef, useState } from 'react';
import { MapContext } from '../contexts/MapContext';
import { drawRectangle } from '../helpers/draw-shapes';

export interface MapCanvasProps extends React.PropsWithChildren {
	offsetX?: number;
	offsetY?: number;
	w?: number;
	h?: number;
	isAddingRectangle: boolean;
	onRectangleAdded: (rectangle: Rectangle) => void;
}

const MapCanvas: React.FC<MapCanvasProps> = ({
	offsetX = 0,
	offsetY = 0,
	w = 0,
	h = 0,
	isAddingRectangle,
	onRectangleAdded,
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
		left: offsetX,
		top: offsetY,
	};

	const transform = useContext(MapContext).transform;

	const [rectangle, setRectangle] = useState<Rectangle | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);

	const clearCanvas = useCallback(() => {
		if (!context) {
			console.error('ERROR: clearCanvas called in an invalid UI state.');
			return;
		}
		context?.clearRect(0, 0, w, h);
	}, [context, w, h]);

	const getDrawingCoords = (x: number, y: number) => {
		if (!canvas.current?.getBoundingClientRect()) {
			throw Error("ERROR: couldn't get bounding rectangle for canvas");
		}

		const canvasX = canvas.current.getBoundingClientRect().x;
		const canvasY = canvas.current.getBoundingClientRect().y;

		return {
			x: Math.round(x - canvasX) / transform.scale,
			y: Math.round(y - canvasY) / transform.scale,
		};
	};

	const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
		const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
		if (isAddingRectangle) {
			startDrawingRectangle(relativeCoords.x, relativeCoords.y);
		}
	};

	const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
		if (isDrawing) {
			const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
			if (isAddingRectangle) {
				adjustRectangle(relativeCoords.x, relativeCoords.y);
			}
		}
	};

	const handleMouseUp = () => {
		if (isDrawing) {
			if (isAddingRectangle) {
				finishDrawingRectangle();
			}
		}
	};

	const startDrawingRectangle = (x: number, y: number) => {
		setRectangle({
			x1: x,
			y1: y,
			x2: x,
			y2: y,
		});
		setIsDrawing(true);
	};

	const adjustRectangle = (x: number, y: number) => {
		if (!context || !rectangle) {
			throw Error('Invalid UI state');
		}
		rectangle.x2 = x;
		rectangle.y2 = y;
		clearCanvas();
		drawRectangle(context, rectangle);
	};

	const finishDrawingRectangle = () => {
		if (!rectangle) {
			throw Error('Rectangle not defined');
		}
		setIsDrawing(false);
		onRectangleAdded(rectangle);
	};

	return (
		<canvas
			ref={canvas}
			style={{
				zIndex: 1,
				...offsetStyle,
			}}
			height={h}
			width={w}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
		/>
	);
};

export default MapCanvas;
