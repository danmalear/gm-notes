import { createContext, type Dispatch } from 'react';
import type { Collapsibles, CollapsiblesAction } from './collapsibleReducer.ts';

export const CollapsiblesContext = createContext<Collapsibles>(null!);
export const CollapsiblesDispatchContext = createContext<
	Dispatch<CollapsiblesAction>
>(null!);
