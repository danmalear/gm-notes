declare module 'react-map-interaction' {
	import type { Component, PropsWithChildren, ReactNode } from 'react';

	interface MapInteractionValue {
		scale: number;
		translation: {
			x: number;
			y: number;
		};
	}

	interface MapInteractionCSSProps extends PropsWithChildren {
		value?: MapInteractionValue;
		defaultValue?: MapInteractionValue;

		disableZoom?: boolean;
		disablePan?: boolean;

		translationBounds?: {
			xMin?: number;
			xMax?: number;
			yMin?: number;
			yMax?: number;
		};

		onChange?: (value: MapInteractionValue) => void;

		minScale?: number;
		maxScale?: number;

		showControls?: boolean;

		plusBtnContents?: ReactNode;
		minusBtnContents?: ReactNode;

		controlsClass?: string;
		btnClass?: string;
		plusBtnClass?: string;
		minusBtnClass?: string;
	}
	class MapInteractionCSS extends Component<MapInteractionCSSProps> {}
}
