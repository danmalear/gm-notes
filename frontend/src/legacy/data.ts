import deathHouse from './deathHouse.tsx';
import type { Map } from './MapData.ts';

interface Data {
	[key: string]: Map;
}

const data: Data = {
	deathHouse,
};

export default data;
