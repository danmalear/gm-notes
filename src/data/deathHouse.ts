import type { Map } from './MapData.ts';

const deathHouseData: Map = {
  imgSrc: '/src/assets/deathhousedm.jpg',
  regions: {
    foyer: {
      code: '1A',
      name: 'Main Entrance - Foyer',
      description: 'The Foyer',
      areas: [
        {
          shape: 'rect',
          coords: '0,0,100,100',
        },
      ],
    },
  },
};

export default deathHouseData;
