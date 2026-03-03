import type { MapResponse } from '#dtos/map.ts';
import { createContext } from 'react';

export interface Transform {
	scale: number;
	translation: {
		x: number;
		y: number;
	};
}

export interface MapContextData {
	map: MapResponse;
	transform: Transform;
}

export const MapContext = createContext<MapContextData>(null!);
