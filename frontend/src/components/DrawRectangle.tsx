import type { Coords, Rectangle } from '#dtos/region.ts';
import { MapContext } from '#map/MapContext.ts';
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	type MouseEvent,
} from 'react';
import {
	RegionContext,
	RegionDispatchContext,
} from '../contexts/RegionContext.ts';
import {
	drawRectangle,
	getRectanglePaths,
	isRectangle,
	isWithinRectangle,
} from '../helpers/shapes.ts';

export interface DrawRectangleProps extends React.PropsWithChildren {
	offsetX?: number;
	offsetY?: number;
	w?: number;
	h?: number;
}

const DrawRectangle: React.FC<DrawRectangleProps> = ({
	offsetX = 0,
	offsetY = 0,
	w = 0,
	h = 0,
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

	const regionState = useContext(RegionContext);
	const regionDispatch = useContext(RegionDispatchContext);

	const rectangle = useMemo(() => {
		if (regionState.regionShape && isRectangle(regionState.regionShape)) {
			return regionState.regionShape;
		}
	}, [regionState.regionShape]);

	const offsetStyle: React.CSSProperties = {
		position: 'absolute',
		left: offsetX,
		top: offsetY,
	};

	const transform = useContext(MapContext).transform;

	const getDrawingCoords = (x: number, y: number) => {
		validateCanvas(canvas.current);

		const canvasX = canvas.current.getBoundingClientRect().x;
		const canvasY = canvas.current.getBoundingClientRect().y;

		return {
			x: Math.round(x - canvasX) / transform.scale,
			y: Math.round(y - canvasY) / transform.scale,
		};
	};

	const canvas = useRef<HTMLCanvasElement | null>(null);

	const context = canvas.current?.getContext('2d');
	if (context) {
		context.strokeStyle = '#00ff0080';
		context.lineWidth = 5;
	}

	const [preDrawCoords, setPreDrawCoords] = useState<Coords | undefined>(
		undefined,
	);
	const [preDrawRect, setPreDrawRect] = useState<Rectangle | undefined>(
		undefined,
	);

	const change = (rect: Rectangle) => {
		regionDispatch({
			type: 'updated_region_shape',
			shape: rect,
		});
	};

	type DrawType = 'move' | 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';
	const [drawType, setDrawType] = useState<DrawType | undefined>(undefined);

	useEffect(() => {
		if (!rectangle || !context) {
			return;
		}
		clearCanvas(context);
		drawRectangle(context, rectangle);
	}, [context, rectangle, clearCanvas]);

	const handleEditMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
		const { x, y } = relativeCoords;
		if (rectangle) {
			startDrawing(x, y, rectangle);
		} else {
			startNew(x, y);
		}
	};

	const handleEditMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
		const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
		const { x, y } = relativeCoords;
		if (drawType) {
			adjust(drawType, x, y);
		} else if (rectangle) {
			setCursor(x, y, rectangle);
		}
	};

	const handleEditMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		if (drawType) {
			finishDrawing();
		}
	};

	const setCursor = (x: number, y: number, rect: Rectangle) => {
		validateCanvas(canvas.current);
		validateContext(context);
		canvas.current.style.cursor = 'default';
		const paths = getRectanglePaths(rect);
		const isN = context.isPointInStroke(paths.topLine, x, y);
		const isE = context.isPointInStroke(paths.rightLine, x, y);
		const isS = context.isPointInStroke(paths.bottomLine, x, y);
		const isW = context.isPointInStroke(paths.leftLine, x, y);
		if (isN) {
			if (isE) {
				canvas.current.style.cursor = 'nesw-resize';
			} else if (isW) {
				canvas.current.style.cursor = 'nwse-resize';
			} else {
				canvas.current.style.cursor = 'ns-resize';
			}
		} else if (isS) {
			if (isE) {
				canvas.current.style.cursor = 'nwse-resize';
			} else if (isW) {
				canvas.current.style.cursor = 'nesw-resize';
			} else {
				canvas.current.style.cursor = 'ns-resize';
			}
		} else if (isE || isW) {
			canvas.current.style.cursor = 'ew-resize';
		} else if (isWithinRectangle({ x, y }, rect)) {
			canvas.current.style.cursor = 'all-scroll';
		}
	};

	const startNew = (x: number, y: number) => {
		regionDispatch({
			type: 'selected_region_shape',
			shape: { x1: x, y1: y, x2: x, y2: y },
		});
		setDrawType('se');
	};

	const startDrawing = (x: number, y: number, rect: Rectangle) => {
		validateCanvas(canvas.current);
		validateContext(context);
		setPreDrawCoords({ x, y });
		setPreDrawRect(rectangle);
		const paths = getRectanglePaths(rect);
		const isN = context.isPointInStroke(paths.topLine, x, y);
		const isE = context.isPointInStroke(paths.rightLine, x, y);
		const isS = context.isPointInStroke(paths.bottomLine, x, y);
		const isW = context.isPointInStroke(paths.leftLine, x, y);
		if (isN) {
			if (isE) {
				setDrawType('ne');
			} else if (isW) {
				setDrawType('nw');
			} else {
				setDrawType('n');
			}
		} else if (isS) {
			if (isE) {
				setDrawType('se');
			} else if (isW) {
				setDrawType('sw');
			} else {
				setDrawType('s');
			}
		} else if (isE) {
			setDrawType('e');
		} else if (isW) {
			setDrawType('w');
		} else if (isWithinRectangle({ x, y }, rect)) {
			setDrawType('move');
		}
	};

	const adjust = (drawType: DrawType, x: number, y: number) => {
		if (!rectangle) {
			throw Error('Invalid UI state');
		}
		switch (drawType) {
			case 'nw':
				change({
					...rectangle,
					x1: x,
					y1: y,
				});
				break;
			case 'n':
				change({
					...rectangle,
					y1: y,
				});
				break;
			case 'ne':
				change({
					...rectangle,
					x2: x,
					y1: y,
				});
				break;
			case 'e':
				change({
					...rectangle,
					x2: x,
				});
				break;
			case 'se':
				change({
					...rectangle,
					x2: x,
					y2: y,
				});
				break;
			case 's':
				change({
					...rectangle,
					y2: y,
				});
				break;
			case 'sw':
				change({
					...rectangle,
					x1: x,
					y2: y,
				});
				break;
			case 'w':
				change({
					...rectangle,
					x1: x,
				});
				break;
		}
		if (drawType === 'move') {
			if (!preDrawRect || !preDrawCoords) {
				throw Error('Invalid UI state');
			}
			const xDiff = x - preDrawCoords.x;
			const yDiff = y - preDrawCoords.y;
			change({
				x1: preDrawRect.x1 + xDiff,
				y1: preDrawRect.y1 + yDiff,
				x2: preDrawRect.x2 + xDiff,
				y2: preDrawRect.y2 + yDiff,
			});
		}
	};

	// Safely sets rectangle so x1 and y1 are always the smaller value
	const finishDrawing = () => {
		if (!rectangle) {
			throw Error('Invalid UI state');
		}
		const newRect = {
			...rectangle,
		};
		if (rectangle.x2 < rectangle.x1) {
			newRect.x2 = rectangle.x1;
			newRect.x1 = rectangle.x2;
		}
		if (rectangle.y2 < rectangle.y1) {
			newRect.y2 = rectangle.y1;
			newRect.y1 = rectangle.y2;
		}
		change(newRect);
		setPreDrawCoords(undefined);
		setPreDrawRect(undefined);
		setDrawType(undefined);
	};

	return (
		<canvas
			ref={canvas}
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
	);
};

export default DrawRectangle;
