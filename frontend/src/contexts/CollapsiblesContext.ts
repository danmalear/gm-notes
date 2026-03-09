import { createContext, Dispatch } from 'react';
import {
	Collapsibles,
	CollapsiblesAction,
} from '../reducers/collapsibleReducer.ts';

export const CollapsiblesContext = createContext<Collapsibles>(null!);
export const CollapsiblesDispatchContext = createContext<
	Dispatch<CollapsiblesAction>
>(null!);
