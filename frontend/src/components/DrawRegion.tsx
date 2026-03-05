import type { Coords, Rectangle, Shape } from '#dtos/region.ts';
import {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	type MouseEvent,
} from 'react';
import { MapContext } from '../contexts/MapContext.ts';
import {
	drawRectangle,
	isRectangle,
	isWithinRectangle,
} from '../helpers/shapes.ts';

export interface MapCanvasProps extends React.PropsWithChildren {
	offsetX?: number;
	offsetY?: number;
	w?: number;
	h?: number;
	existingShapes: Shape[];
	activeShape?: Shape;
	isAddingRectangle: boolean;
	onShapeSelected: (shape: Shape) => void;
	onShapeAdded: (shape: Shape) => void;
}

const MapCanvas: React.FC<MapCanvasProps> = ({
	offsetX = 0,
	offsetY = 0,
	w = 0,
	h = 0,
	existingShapes,
	activeShape,
	isAddingRectangle,
	onShapeSelected,
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
		existingContext.fillStyle = '#ff000080';
		existingContext.lineWidth = 5;
	}

	const getDrawingCoords = (x: number, y: number) => {
		if (!existingCanvas.current?.getBoundingClientRect()) {
			throw Error("ERROR: couldn't get bounding rectangle for canvas");
		}

		const canvasX = existingCanvas.current.getBoundingClientRect().x;
		const canvasY = existingCanvas.current.getBoundingClientRect().y;

		return {
			x: Math.round(x - canvasX) / transform.scale,
			y: Math.round(y - canvasY) / transform.scale,
		};
	};

	let minX = 1000000;
	let maxX = -1000000;
	let minY = 1000000;
	let maxY = -1000000;

	for (const shape of existingShapes) {
		if (isRectangle(shape)) {
			minX = Math.min(minX, shape.x1, shape.x2);
			maxX = Math.max(maxX, shape.x1, shape.x2);
			minY = Math.min(minY, shape.y1, shape.y2);
			maxY = Math.max(maxY, shape.y1, shape.y2);
		}
		// @TODO other shapes
	}

	useEffect(() => {
		if (existingContext) {
			clearCanvas(existingContext);
			if (existingShapes.length) {
				existingShapes.forEach((shape) => {
					if (isRectangle(shape)) {
						drawRectangle(existingContext, shape, true);
					}
				});
			}
		}
	}, [clearCanvas, existingContext, existingShapes]);

	const findExistingShape = (coords: Coords) => {
		// this if statement is just to protect against constant iteration
		if (
			isWithinRectangle(coords, {
				x1: minX,
				x2: maxX,
				y1: minY,
				y2: maxY,
			})
		) {
			for (const shape of existingShapes) {
				if (isRectangle(shape) && isWithinRectangle(coords, shape)) {
					return shape;
				}
				// @TODO other shapes
			}
		}
	};

	const handleExistingMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		if (!existingCanvas.current) {
			throw Error("ERROR: couldn't find canvas");
		}

		const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
		existingCanvas.current.style.cursor = '';
		if (findExistingShape(relativeCoords)) {
			existingCanvas.current.style.cursor = 'pointer';
		}
	};

	const handleExistingClick = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		if (!existingCanvas.current) {
			throw Error("ERROR: couldn't find canvas");
		}

		const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
		const existingShape = findExistingShape(relativeCoords);
		if (existingShape) {
			onShapeSelected(existingShape);
		}
	};
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

	useEffect(() => {
		if (activeShape) {
			if (!editContext) {
				return;
			}
			if (isRectangle(activeShape)) {
				setRectangle(activeShape);
				drawRectangle(editContext, activeShape);
			}
		}
	}, [editContext, activeShape]);

	const handleEditMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
		if (isAddingRectangle) {
			startDrawingRectangle(relativeCoords.x, relativeCoords.y);
		}
	};

	const handleEditMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
		if (isDrawing) {
			const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
			if (isAddingRectangle) {
				adjustRectangle(relativeCoords.x, relativeCoords.y);
			}
		}
	};

	const handleEditMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
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
			{isAddingRectangle || activeShape ? (
				<canvas
					ref={editCanvas}
					style={{
						zIndex: 2,
						...offsetStyle,
					}}
					height={h}
					width={w}
					onMouseDown={handleEditMouseDown}
					onMouseUp={handleEditMouseUp}
					onMouseMove={handleEditMouseMove}
				/>
			) : null}
			<canvas
				ref={existingCanvas}
				style={{
					zIndex: 1,
					...offsetStyle,
				}}
				height={h}
				width={w}
				onClick={handleExistingClick}
				onMouseMove={handleExistingMouseMove}
			/>
		</>
	);
};

export default MapCanvas;
