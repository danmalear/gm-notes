import type { Coords, Shape } from '#dtos/region.ts';
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	type MouseEvent,
} from 'react';
import { MapContext } from '../contexts/MapContext.ts';
import {
	drawRectangle,
	getRectanglePaths,
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
	onShapeChange: (shape: Shape) => void;
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
	onShapeChange,
}) => {
	const clearCanvas = useCallback(
		(context: CanvasRenderingContext2D) => {
			context.clearRect(0, 0, w, h);
		},
		[w, h],
	);

	function validateCanvas(
		canvas: HTMLCanvasElement | undefined | null,
	): asserts canvas is HTMLCanvasElement {
		if (!canvas) {
			throw Error('ERROR: Canvas not loaded');
		}
	}

	function validateContext(
		context: CanvasRenderingContext2D | null | undefined,
	): asserts context is CanvasRenderingContext2D {
		if (!context) {
			throw Error('ERROR: Canvas context not loaded');
		}
	}

	const offsetStyle: React.CSSProperties = {
		position: 'absolute',
		left: offsetX,
		top: offsetY,
	};

	const transform = useContext(MapContext).transform;

	const isAddingNewShape = useMemo(
		() => isAddingRectangle,
		[isAddingRectangle],
	);

	// #region existing
	const existingCanvas = useRef<HTMLCanvasElement | null>(null);

	const existingContext = existingCanvas.current?.getContext('2d');
	if (existingContext) {
		existingContext.fillStyle = '#ff000080';
		existingContext.lineWidth = 5;
	}

	const getDrawingCoords = (x: number, y: number) => {
		validateCanvas(existingCanvas.current);

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
		if (isAddingNewShape || activeShape) {
			return;
		}
		validateCanvas(existingCanvas.current);

		const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
		existingCanvas.current.style.cursor = '';
		if (findExistingShape(relativeCoords)) {
			existingCanvas.current.style.cursor = 'pointer';
		}
	};

	const handleExistingClick = (e: MouseEvent<HTMLCanvasElement>) => {
		if (e.defaultPrevented) return;
		e.preventDefault();

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
		editContext.strokeStyle = '#00ff0080';
		editContext.lineWidth = 5;
	}

	const [preDrawCoords, setPreDrawCoords] = useState<Coords | null>(null);
	const [preDrawShape, setPreDrawShape] = useState<Shape | null>(null);

	// Safely sets rectangle so x1 and y1 are always the smaller value
	const changeShape = (shape: Shape) => {
		let temp = 0;
		if (isRectangle(shape)) {
			if (shape.x2 < shape.x1) {
				temp = shape.x2;
				shape.x2 = shape.x1;
				shape.x1 = temp;
			}
			if (shape.y2 < shape.y1) {
				temp = shape.y2;
				shape.y2 = shape.y1;
				shape.y1 = temp;
			}
		}
		onShapeChange(shape);
	};

	type RectDrawType =
		| 'rectMove'
		| 'rectNW'
		| 'rectN'
		| 'rectNE'
		| 'rectE'
		| 'rectSE'
		| 'rectS'
		| 'rectSW'
		| 'rectW';
	type DrawType = RectDrawType;
	const [drawType, setDrawType] = useState<DrawType | null>(null);

	useEffect(() => {
		if (!activeShape || !editContext) {
			return;
		}
		if (isRectangle(activeShape)) {
			clearCanvas(editContext);
			drawRectangle(editContext, activeShape);
		}
	}, [editContext, activeShape, clearCanvas]);

	const handleEditMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
		const { x, y } = relativeCoords;
		if (isAddingRectangle) {
			startNewRectangle(x, y);
		} else if (activeShape) {
			validateCanvas(editCanvas.current);
			validateContext(editContext);
			setPreDrawCoords({ x, y });
			setPreDrawShape(activeShape);
			if (isRectangle(activeShape)) {
				const paths = getRectanglePaths(activeShape);
				const isN = editContext.isPointInStroke(paths.topLine, x, y);
				const isE = editContext.isPointInStroke(paths.rightLine, x, y);
				const isS = editContext.isPointInStroke(paths.bottomLine, x, y);
				const isW = editContext.isPointInStroke(paths.leftLine, x, y);
				if (isN) {
					if (isE) {
						setDrawType('rectNE');
					} else if (isW) {
						setDrawType('rectNW');
					} else {
						setDrawType('rectN');
					}
				} else if (isS) {
					if (isE) {
						setDrawType('rectSE');
					} else if (isW) {
						setDrawType('rectSW');
					} else {
						setDrawType('rectS');
					}
				} else if (isE) {
					setDrawType('rectE');
				} else if (isW) {
					setDrawType('rectW');
				} else if (isWithinRectangle({ x, y }, activeShape)) {
					setDrawType('rectMove');
				}
			}
		}
	};

	const handleEditMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
		const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
		const { x, y } = relativeCoords;
		if (drawType) {
			adjustRectangle(drawType, x, y);
		} else if (activeShape) {
			validateCanvas(editCanvas.current);
			validateContext(editContext);
			editCanvas.current.style.cursor = 'default';
			if (isRectangle(activeShape)) {
				const paths = getRectanglePaths(activeShape);
				const isN = editContext.isPointInStroke(paths.topLine, x, y);
				const isE = editContext.isPointInStroke(paths.rightLine, x, y);
				const isS = editContext.isPointInStroke(paths.bottomLine, x, y);
				const isW = editContext.isPointInStroke(paths.leftLine, x, y);
				if (isN) {
					if (isE) {
						editCanvas.current.style.cursor = 'nesw-resize';
					} else if (isW) {
						editCanvas.current.style.cursor = 'nwse-resize';
					} else {
						editCanvas.current.style.cursor = 'ns-resize';
					}
				} else if (isS) {
					if (isE) {
						editCanvas.current.style.cursor = 'nwse-resize';
					} else if (isW) {
						editCanvas.current.style.cursor = 'nesw-resize';
					} else {
						editCanvas.current.style.cursor = 'ns-resize';
					}
				} else if (isE || isW) {
					editCanvas.current.style.cursor = 'ew-resize';
				} else if (isWithinRectangle({ x, y }, activeShape)) {
					editCanvas.current.style.cursor = 'all-scroll';
				}
			}
		}
	};

	const handleEditMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		if (drawType) {
			if (isAddingRectangle || (activeShape && isRectangle(activeShape))) {
				finishDrawingRectangle();
			}
			setPreDrawCoords(null);
			setPreDrawShape(null);
			setDrawType(null);
		}
	};

	const startNewRectangle = (x: number, y: number) => {
		onShapeSelected({
			x1: x,
			y1: y,
			x2: x,
			y2: y,
		});
		setDrawType('rectSE');
	};

	const adjustRectangle = (drawType: RectDrawType, x: number, y: number) => {
		if (!activeShape || !isRectangle(activeShape)) {
			throw Error('Invalid UI state');
		}
		switch (drawType) {
			case 'rectNW':
				changeShape({
					...activeShape,
					x1: x,
					y1: y,
				});
				break;
			case 'rectN':
				changeShape({
					...activeShape,
					y1: y,
				});
				break;
			case 'rectNE':
				changeShape({
					...activeShape,
					x2: x,
					y1: y,
				});
				break;
			case 'rectE':
				changeShape({
					...activeShape,
					x2: x,
				});
				break;
			case 'rectSE':
				changeShape({
					...activeShape,
					x2: x,
					y2: y,
				});
				break;
			case 'rectS':
				changeShape({
					...activeShape,
					y2: y,
				});
				break;
			case 'rectSW':
				changeShape({
					...activeShape,
					x1: x,
					y2: y,
				});
				break;
			case 'rectW':
				changeShape({
					...activeShape,
					x1: x,
				});
				break;
		}
		if (drawType === 'rectMove') {
			if (!preDrawShape || !isRectangle(preDrawShape) || !preDrawCoords) {
				throw Error('Invalid UI state');
			}
			const xDiff = x - preDrawCoords.x;
			const yDiff = y - preDrawCoords.y;
			changeShape({
				x1: preDrawShape.x1 + xDiff,
				y1: preDrawShape.y1 + yDiff,
				x2: preDrawShape.x2 + xDiff,
				y2: preDrawShape.y2 + yDiff,
			});
		}
	};

	const finishDrawingRectangle = () => {
		validateContext(editContext);
	};
	// #endregion editing

	return (
		<>
			{isAddingNewShape || activeShape ? (
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
