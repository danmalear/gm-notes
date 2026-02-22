import type { MapResponse } from 'backend/src/dtos/map.js';
import { createContext } from 'react';

export const MapContext = createContext<MapResponse>(null!);
