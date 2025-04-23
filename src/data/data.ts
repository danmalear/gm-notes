import deathHouse from './deathHouse';
import type { Map } from './MapData';

interface Data {
  [key: string]: Map;
}

const data: Data = {
  deathHouse,
};

export default data;
