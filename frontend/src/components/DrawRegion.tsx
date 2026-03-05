import type { Rectangle, Shape } from '#dtos/region.ts';
import {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	type MouseEvent,
} from 'react';
import { MapContext } from '../contexts/MapContext.ts';
import { drawRectangle, isRectangle } from '../helpers/shapes.ts';

export interface MapCanvasProps extends React.PropsWithChildren {
	offsetX?: number;
	offsetY?: number;
	w?: number;
	h?: number;
	existingShapes: Shape[];
	isAddingRectangle: boolean;
	onShapeAdded: (shape: Shape) => void;
}

const MapCanvas: React.FC<MapCanvasProps> = ({
	offsetX = 0,
	offsetY = 0,
	w = 0,
	h = 0,
	existingShapes,
	isAddingRectangle,
	onShapeAdded,
}) => {
	const clearCanvas = useCallback(
		(context: CanvasRenderingContext2D) => {
			context.clearRect(0, 0, w, h);
		},
		[w, h],
	);

	const offsetStyle: React.CSSProperties = {
		position: 'absolute',
		left: offsetX,
		top: offsetY,
	};

	const transform = useContext(MapContext).transform;

	// #region existing
	const existingCanvas = useRef<HTMLCanvasElement | null>(null);

	const existingContext = existingCanvas.current?.getContext('2d');
	if (existingContext) {
		existingContext.strokeStyle = 'red';
		existingContext.lineWidth = 5;
	}

	useEffect(() => {
		if (existingContext && existingShapes.length) {
			existingShapes.forEach((shape) => {
				if (isRectangle(shape)) {
					drawRectangle(existingContext, shape);
				}
			});
		}
	}, [existingContext, existingShapes]);
	// #endregion existing

	// #region editing
	const editCanvas = useRef<HTMLCanvasElement | null>(null);

	const editContext = editCanvas.current?.getContext('2d');
	if (editContext) {
		editContext.strokeStyle = 'green';
		editContext.lineWidth = 5;
	}
	const [rectangle, setRectangle] = useState<Rectangle | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);

	const getDrawingCoords = (x: number, y: number) => {
		if (!editCanvas.current?.getBoundingClientRect()) {
			throw Error("ERROR: couldn't get bounding rectangle for canvas");
		}

		const canvasX = editCanvas.current.getBoundingClientRect().x;
		const canvasY = editCanvas.current.getBoundingClientRect().y;

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
		if (!editContext || !rectangle) {
			throw Error('Invalid UI state');
		}
		rectangle.x2 = x;
		rectangle.y2 = y;
		clearCanvas(editContext);
		drawRectangle(editContext, rectangle);
	};

	const finishDrawingRectangle = () => {
		if (!editContext || !rectangle) {
			throw Error('Rectangle not defined');
		}
		setIsDrawing(false);
		onShapeAdded(rectangle);
		clearCanvas(editContext);
	};
	// #endregion editing

	return (
		<>
			<canvas
				ref={editCanvas}
				style={{
					zIndex: 2,
					...offsetStyle,
				}}
				height={h}
				width={w}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
			/>
			<canvas
				ref={existingCanvas}
				style={{
					zIndex: 1,
					...offsetStyle,
				}}
				height={h}
				width={w}
			/>
		</>
	);
};

export default MapCanvas;
