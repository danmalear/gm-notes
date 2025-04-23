import type { Map } from './MapData.ts';

const deathHouseData: Map = {
  image: {
    src: '/src/assets/death-house.jpg',
    sizeX: 5455,
    sizeY: 7500,
  },
  regions: {
    portico: {
      code: '1A',
      name: 'Main Entrance - Portico',
      description: 'The Portico',
      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 413,
            y1: 6808,
            x2: 737,
            y2: 6973,
          },
        },
      ],
    },
    foyer: {
      code: '1B',
      name: 'Main Entrance - Foyer',
      description: 'The Foyer',
      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 413,
            y1: 6320,
            x2: 737,
            y2: 6804,
          },
        },
      ],
    },
  },
};

export default deathHouseData;
