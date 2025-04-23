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
      descriptions: [
        {
          prompt: 'Entry',
          text: (
            <>
              <p>
                A grand manor stands before you, four stories of cold,
                soot-stained stone, tall narrow windows, and high peaked roofs
                forming a picture of austere, chilling grandeur. Midway up, a
                narrow balcony juts out from the third floor, offering a grim
                perch from which to survey the surrounding grounds.
              </p>
              <p>
                The centerpiece of this imposing facade is the portico, a stone
                arch standing sentinel before the house's oaken doors. A
                wrought-iron gate fills this arch, its rusty hinges creaking as
                it sways in the wind.
              </p>
              <p>
                On either side of the gate, oil lamps hang from chains, their
                light dim and flickering, casting a sickly glow that barely
                pierces the surrounding fog.
              </p>
              <p>
                Beyond the gate, a set of sturdy oaken doors stand closed,
                framed by the gate and the lamps. The doors are old and
                weathered, their wood darkened by time, but they stand strong
                and proud—an unwelcome entrance to the house beyond.
              </p>
              <p>
                A gust of wind sweeps past you, carrying with it a whisper of
                cold dread that sends shivers down your spine.
              </p>
            </>
          ),
        },
      ],
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
      descriptions: [
        {
          prompt: 'Entry',
          text: (
            <>
              <p>
                The foyer is a grand space, its high ceiling adorned with ornate
              </p>
            </>
          ),
        },
      ],
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
