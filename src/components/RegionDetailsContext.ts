import { createContext, Dispatch } from 'react';
import {
  Collapsibles,
  CollapsiblesAction,
} from '../reducers/collapsibleReducer';

export const RegionDetailsContext = createContext<Collapsibles>(null!);
export const RegionDetailsDispatchContext = createContext<
  Dispatch<CollapsiblesAction>
>(null!);
