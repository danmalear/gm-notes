import { createContext, type Dispatch } from 'react';
import type { RegionAction, RegionState } from '../reducers/regionReducer.ts';

export const RegionContext = createContext<RegionState>(null!);
export const RegionDispatchContext = createContext<Dispatch<RegionAction>>(
	null!,
);
