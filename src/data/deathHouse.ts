import type { Map } from './MapData.ts';

const deathHouseData: Map = {
  imgSrc: '/src/assets/deathhousedm.jpg',
  regions: {
    portico: {
      code: '1A',
      name: 'Main Entrance - Portico',
      description: 'The Portico',
      areas: [
        {
          shape: 'rect',
          coords: '107,1778,192,1822',
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
          coords: '107,1651,192,1775',
        },
      ],
    },
  },
};

export default deathHouseData;
