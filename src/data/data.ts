import deathHouse from './deathHouse';
import type { MapData } from './MapData';

interface Data {
  [key: string]: MapData;
}

const data: Data = {
  deathHouse,
};

export default data;
