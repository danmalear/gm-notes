import type { MapResponse } from '#dtos/Map.ts';
import { createContext } from 'react';

export const MapContext = createContext<MapResponse>(null!);
