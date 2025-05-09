import type { Region } from './MapData.ts';

const atticRegions: {
  [key: string]: Region;
} = {
  // @TODO creatures, checks, items, notes
  atticHall: {
    code: '16',
    name: 'Attic Hall',
    lighting: {
      day: 'Darkness',
      between: 'Darkness',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Entry',
        text: (
          <>
            <p>
              This bare hall is choked with dust and cobwebs. Several doors lead
              from this attic corridor, including a door held shut with a
              padlock.
            </p>
            <p>
              A low [creak] cuts through the air as one of the unlocked doors
              slowly creaks open.
            </p>
          </>
        ),
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 2224,
          y1: 3517,
          x2: 2708,
          y2: 4169,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 1900,
          y1: 3517,
          x2: 2224,
          y2: 3675,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 2563,
          y1: 3472,
          x2: 2708,
          y2: 3517,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 2389,
          y1: 4169,
          x2: 2708,
          y2: 4327,
        },
      },
    ],
  },

  // @TODO creatures, checks, items, notes
  spareBedroom: {
    code: '17',
    name: 'Spare Bedroom',
    lighting: {
      day: 'Dim light',
      between: 'Darkness',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Entry',
        text: (
          <p>
            This cold, dust-choked room contains a slender bed, a nightstand, a
            small iron stove, a writing desk with a stool, an empty wardrobe,
            and a rocking chair. A frowning doll in a lacy yellow dress sits in
            the northern window box beside a tarnished old music box, cobwebs
            draping it like a wedding veil.
          </p>
        ),
      },
    ],

    handouts: [
      {
        text: 'Floor plan',
        url: 'https://publish-01.obsidian.md/access/7db64b11c71d88572ddc6cd06b888976/images/Death%20House%20Dungeon%20Map.png',
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 2224,
          y1: 4347,
          x2: 2708,
          y2: 4663,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 2224,
          y1: 4179,
          x2: 2376,
          y2: 4347,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 2157,
          y1: 4597,
          x2: 2224,
          y2: 4743,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 2224,
          y1: 4663,
          x2: 2535,
          y2: 4832,
        },
      },
    ],
  },

  // @TODO creatures, checks, items, notes
  storageRoom2: {
    code: '18',
    name: 'Storage Room (Attic)',
    lighting: {
      day: 'Dim light',
      between: 'Darkness',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Entry',
        text: (
          <p>
            This dusty chamber is packed with lumpy, squat shapes draped in
            dusty white sheets. An old iron stove stands against the right-side
            wall, next to what looks to be a large trunk covered by a sheet.
          </p>
        ),
      },
      {
        prompt: 'Inspecting remains',
        text: (
          <p>
            As you examine the corpse, you feel an icy cold breath on your
            shoulder, and a horrible feeling of being watched. [mirror] [PC],
            you see in the mirror the cold, stern countenance of Elisabeth Durst
            staring daggers at [PC]. She then turns to look at you and
            vanishes.[/mirror] Then as suddenly as it started, the feeling
            washes away.
          </p>
        ),
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 1729,
          y1: 3682,
          x2: 2213,
          y2: 4420,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 1900,
          y1: 4420,
          x2: 2053,
          y2: 4490,
        },
      },
    ],
  },

  // @TODO creatures, checks, items, notes
  guestBedroom: {
    code: '19',
    name: 'Guest Bedroom',
    lighting: {
      day: 'Dim light',
      between: 'Darkness',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Entry',
        text: (
          <p>
            This web-filled room contains a slender bed, a nightstand, a rocking
            chair, an open and empty wardrobe, and a small iron stove.
          </p>
        ),
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 1729,
          y1: 3035,
          x2: 2053,
          y2: 3509,
        },
      },
    ],
  },

  // @TODO creatures, checks, items, notes
  childrensRoom: {
    code: '20',
    name: "Children's Room",
    lighting: {
      day: 'Darkness',
      between: 'Darkness',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Entry',
        text: (
          <p>
            This room contains a bricked-up window flanked by two dusty,
            wood-framed beds sized for children. Closer to the door is a toy
            chest with windmills painted on its sides and a dollhouse that's a
            perfect replica of the dreary edifice in which you stand. These
            furnishings are draped in cobwebs. Lying in the middle of the floor
            are two small skeletons wearing tattered clothing. The smaller of
            the two cradles a stuffed doll.
          </p>
        ),
      },
    ],

    opportunities: [
      'Any secret door revealed by dollhouse (see checks) has Advantage to be found in person.',
      'Rose can be convinced to show the party the entrance to the basement in the dollhouse, which is conjured and will be automatically revealed when next sought in person.',
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 2063,
          y1: 3035,
          x2: 2535,
          y2: 3509,
        },
      },
    ],
  },

  secretStairs: {
    code: '21',
    name: 'Secret Stairs',
    lighting: {
      day: 'Darkness',
      between: 'Darkness',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Entry',
        text: (
          <p>
            The secret door opens to reveal a narrow spiral staircase built of
            aged-looking wood within a tight shaft of mortared stone. Thick
            cobwebs fill the staircase as it descends into the darkness below.
          </p>
        ),
      },
      {
        prompt: 'Descent',
        text: (
          <>
            <p>
              The broken cobwebs around you sway like a gossamer wedding veil,
              beckoning you forward as the ancient stairs creak and groan
              underfoot. The gaping maw of the stairwell draws you deeper,
              swallowing you up as you descend further down its gullet. You
              descend one floor—two floors—three.
            </p>
            <p>
              The walls of the stone shaft narrow around you, forcing you to
              hunch your shoulders and pull in your elbows to continue downward.
              In the darkness, you can only hear the shuffle of your feet, the
              choking groan of the stairs, and the pounding of your blood in
              your ears.
            </p>
          </>
        ),
      },
    ],

    areas: [
      {
        shape: 'circle',
        coords: {
          x: 495,
          y: 5739,
          r: 70,
        },
      },
      {
        shape: 'circle',
        coords: {
          x: 1812,
          y: 5739,
          r: 70,
        },
      },
      {
        shape: 'circle',
        coords: {
          x: 489,
          y: 3598,
          r: 70,
        },
      },
      {
        shape: 'circle',
        coords: {
          x: 1808,
          y: 3598,
          r: 70,
        },
      },
      {
        shape: 'circle',
        coords: {
          x: 3788,
          y: 1289,
          r: 70,
        },
      },
    ],
  },
};

export default atticRegions;
