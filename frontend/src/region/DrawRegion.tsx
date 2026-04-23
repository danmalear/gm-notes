import { MapContext } from '#map/MapContext.ts';
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	type MouseEvent,
} from 'react';
import type { Coords } from './region-dtos.ts';
import { RegionContext, RegionDispatchContext } from './RegionContext.ts';
import { isHardCoded } from './regionReducer.ts';
import DrawRectangle from './shape/DrawRectangle.tsx';
import {
	drawRectangle,
	isRectangle,
	isWithinRectangle,
} from './shape/shape-utils.ts';

export interface DrawRegionProps extends React.PropsWithChildren {
	offsetX?: number;
	offsetY?: number;
	w?: number;
	h?: number;
}

const DrawRegion: React.FC<DrawRegionProps> = ({
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

	const offsetStyle: React.CSSProperties = {
		position: 'absolute',
		left: offsetX,
		top: offsetY,
	};

	const transform = useContext(MapContext).transform;
	const regionState = useContext(RegionContext);
	const regionDispatch = useContext(RegionDispatchContext);

	if (!regionState.region || isHardCoded(regionState.region)) {
		throw Error('Invalid region state for drawing shapes');
	}

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

	for (const shape of regionState.region.shapes) {
		if (isRectangle(shape)) {
			minX = Math.min(minX, shape.x1, shape.x2);
			maxX = Math.max(maxX, shape.x1, shape.x2);
			minY = Math.min(minY, shape.y1, shape.y2);
			maxY = Math.max(maxY, shape.y1, shape.y2);
		}
	}

	useEffect(() => {
		if (existingContext) {
			clearCanvas(existingContext);
			if (!regionState.region || isHardCoded(regionState.region)) {
				throw Error('Invalid region state for drawing shapes');
			}
			if (regionState.region.shapes.length) {
				regionState.region.shapes.forEach((shape) => {
					if (isRectangle(shape)) {
						drawRectangle(existingContext, shape, true);
					}
				});
			}
		}
	}, [clearCanvas, existingContext, regionState.region]);

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
			if (!regionState.region || isHardCoded(regionState.region)) {
				throw Error('Invalid region state for drawing shapes');
			}
			for (const shape of regionState.region.shapes) {
				if (isRectangle(shape) && isWithinRectangle(coords, shape)) {
					return shape;
				}
				// @TODO other shapes
			}
		}
	};

	const handleExistingMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		if (!!regionState.newShapeType || !!regionState.regionShape) {
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
			regionDispatch({
				type: 'selected_region_shape',
				shape: existingShape,
			});
		}
	};
	// #endregion existing

	const isDrawingRectangle = useMemo(
		() =>
			regionState.newShapeType === 'Rectangle' ||
			(regionState.regionShape && isRectangle(regionState.regionShape)),
		[regionState.newShapeType, regionState.regionShape],
	);

	return (
		<>
			{isDrawingRectangle ? (
				<DrawRectangle offsetX={offsetX} offsetY={offsetY} h={h} w={w} />
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

export default DrawRegion;
