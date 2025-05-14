import deathHouse from './deathHouse';
import type { Map } from './MapData.tsx';

interface Data {
	[key: string]: Map;
}

const data: Data = {
	deathHouse,
};

export default data;
