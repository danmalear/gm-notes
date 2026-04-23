import type { Dispatch } from 'react';
import { createContext } from 'react';
import type { MapAction, MapState } from './map-reducer.ts';

export const MapContext = createContext<MapState>(null!);
export const MapDispatchContext = createContext<Dispatch<MapAction>>(null!);
