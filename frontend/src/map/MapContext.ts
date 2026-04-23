import type { Dispatch } from 'react';
import { createContext } from 'react';
import type { MapAction, MapState } from './mapReducer.ts';

export const MapContext = createContext<MapState>(null!);
export const MapDispatchContext = createContext<Dispatch<MapAction>>(null!);
