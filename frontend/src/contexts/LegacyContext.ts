import { createContext } from 'react';
import type { TimeOfDay } from '../data/MapData.ts';

interface LegacyData {
	timeOfDay: TimeOfDay;
}

export const LegacyContext = createContext<LegacyData>(null!);
