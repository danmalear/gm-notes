import type { MapResponse } from '#dtos/map.ts';
import { createContext } from 'react';

export const MapContext = createContext<MapResponse>(null!);
