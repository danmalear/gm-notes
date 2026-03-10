import { createContext, Dispatch } from 'react';
import { MapAction, MapState } from '../reducers/mapReducer.ts';

export const MapContext = createContext<MapState>(null!);
export const MapDispatchContext = createContext<Dispatch<MapAction>>(null!);
