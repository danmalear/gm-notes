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
	getRectanglePaths,
	isWithinRectangle,
} from '../helpers/shapes.ts';

export interface DrawRectangleProps extends React.PropsWithChildren {
	offsetX?: number;
	offsetY?: number;
	w?: number;
	h?: number;
	activeRect: Rectangle | null;
	onSelect: (shape: Shape) => void;
	onChange: (shape: Shape) => void;
}

const DrawRectangle: React.FC<DrawRectangleProps> = ({
	offsetX = 0,
	offsetY = 0,
	w = 0,
	h = 0,
	activeRect,
	onSelect,
	onChange,
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

	// #region existing
	const getDrawingCoords = (x: number, y: number) => {
		validateCanvas(canvas.current);

		const canvasX = canvas.current.getBoundingClientRect().x;
		const canvasY = canvas.current.getBoundingClientRect().y;

		return {
			x: Math.round(x - canvasX) / transform.scale,
			y: Math.round(y - canvasY) / transform.scale,
		};
	};
	// #endregion existing

	// #region editing
	const canvas = useRef<HTMLCanvasElement | null>(null);

	const context = canvas.current?.getContext('2d');
	if (context) {
		context.strokeStyle = '#00ff0080';
		context.lineWidth = 5;
	}

	const [preDrawCoords, setPreDrawCoords] = useState<Coords | null>(null);
	const [preDrawRect, setPreDrawRect] = useState<Rectangle | null>(null);

	// Safely sets rectangle so x1 and y1 are always the smaller value
	const change = (rect: Rectangle) => {
		let temp = 0;
		if (rect.x2 < rect.x1) {
			temp = rect.x2;
			rect.x2 = rect.x1;
			rect.x1 = temp;
		}
		if (rect.y2 < rect.y1) {
			temp = rect.y2;
			rect.y2 = rect.y1;
			rect.y1 = temp;
		}
		onChange(rect);
	};

	type DrawType = 'move' | 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';
	const [drawType, setDrawType] = useState<DrawType | null>(null);

	useEffect(() => {
		if (!activeRect || !context) {
			return;
		}
		clearCanvas(context);
		drawRectangle(context, activeRect);
	}, [context, activeRect, clearCanvas]);

	const handleEditMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
		const { x, y } = relativeCoords;
		if (activeRect) {
			startDrawing(x, y, activeRect);
		} else {
			startNew(x, y);
		}
	};

	const handleEditMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
		const relativeCoords = getDrawingCoords(e.clientX, e.clientY);
		const { x, y } = relativeCoords;
		if (drawType) {
			adjust(drawType, x, y);
		} else if (activeRect) {
			setCursor(x, y, activeRect);
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
		onSelect({
			x1: x,
			y1: y,
			x2: x,
			y2: y,
		});
		setDrawType('se');
	};

	const startDrawing = (x: number, y: number, rect: Rectangle) => {
		validateCanvas(canvas.current);
		validateContext(context);
		setPreDrawCoords({ x, y });
		setPreDrawRect(activeRect);
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
		if (!activeRect) {
			throw Error('Invalid UI state');
		}
		switch (drawType) {
			case 'nw':
				change({
					...activeRect,
					x1: x,
					y1: y,
				});
				break;
			case 'n':
				change({
					...activeRect,
					y1: y,
				});
				break;
			case 'ne':
				change({
					...activeRect,
					x2: x,
					y1: y,
				});
				break;
			case 'e':
				change({
					...activeRect,
					x2: x,
				});
				break;
			case 'se':
				change({
					...activeRect,
					x2: x,
					y2: y,
				});
				break;
			case 's':
				change({
					...activeRect,
					y2: y,
				});
				break;
			case 'sw':
				change({
					...activeRect,
					x1: x,
					y2: y,
				});
				break;
			case 'w':
				change({
					...activeRect,
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

	const finishDrawing = () => {
		setPreDrawCoords(null);
		setPreDrawRect(null);
		setDrawType(null);
	};
	// #endregion editing

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
