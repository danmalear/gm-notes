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
      name: 'Entrance - Portico',
      lighting: {
        day: 'Bright light',
        between: 'Dim light',
        night: 'Darkness',
      },

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
        {
          prompt: 'Re-entry',
          text: (
            <>
              <p>
                Looking back outside, you find that the exterior of the house
                has been fully surrounded by enormous, fleshy tendrils,
                extruding from beneath the house.
              </p>
            </>
          ),
        },
      ],

      items: [
        {
          name: 'Oil lamps',
          quantity: 2,
          notes: ['Hanging from ceiling', 'Currently unlit'],
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
      name: 'Entrance - Grand Foyer',
      lighting: {
        day: 'Dim light',
        between: 'Darkness',
        night: 'Darkness',
      },

      checks: [
        {
          skills: ['Perception', 'Insight'],
          target: 'Portraits',
          dc: 16,
          prerequisites: ['Party has seen other portraits in the house'],
          success:
            'The subjects in the portraits bear a striking resemblance to the other portraits in the house.',
        },
        {
          skills: ['History'],
          target: 'Portraits',
          dc: 20,
          success:
            'The subjects of the portraits are not of any noble family in Faerûnian history.',
        },
      ],

      descriptions: [
        {
          prompt: 'Entry',
          text: (
            <>
              <p>
                Just inside the front door is a grand foyer. In contrast to the
                decrepit look of the house from outside, the interior seems
                well-preserved and maintained. The wall to your right bears a
                polished shield with a windmill coat of arms, flanked by elegant
                portraits of aristocrats. Through a pair of open doors ahead,
                you can see a well-appointed hall, lit warmly by a fireplace.
              </p>
            </>
          ),
        },
      ],

      items: [
        {
          name: 'Shield',
          quantity: 1,
          notes: ['Windmill coat of arms'],
        },
        {
          name: 'Portraits',
          quantity: 4,
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
