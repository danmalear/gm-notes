import type { Region } from './MapData.ts';

const secondFloorRegions: {
  [key: string]: Region;
} = {
  upperHall: {
    code: '6',
    name: 'Upper Hall',
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
              Unlit oil lamps are mounted on the walls of this elegant hall.
              Hanging above the mantelpiece is a longsword with a windmill cameo
              worked into the hilt.
            </p>
            <p>
              Standing suits of armor flank wooden doors in the east and west
              walls. Each suit of armor clutches a spear and has a visored helm
              shaped like a wolf's head. The doors between them are carved with
              images of dancing youths.
            </p>
            <p>
              The red marble staircase continues its upward spiral to a third
              floor, a cold draft whispering down from above.
            </p>
          </>
        ),
      },
    ],

    checks: [
      {
        skills: ['Perception'],
        target: 'Doors',
        dc: 12,
        success:
          "The youths aren't actually dancing, but instead fighting off swarms of bats.",
      },
    ],

    items: [
      {
        name: 'Longsword',
        notes: [
          'Mounted above the fireplace',
          'Windmill cameo worked into the hilt',
        ],
      },
      {
        name: 'Suits of armor',
        quantity: 4,
        notes: ["Visored helm shaped like a wolf's head"],
      },
      {
        name: 'Spears',
        quantity: 4,
        notes: ['Held by suits of armor'],
      },
      {
        name: 'Oil lamps',
        quantity: 2,
        notes: ['Hanging from walls'],
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 1729,
          y1: 5823,
          x2: 2452,
          y2: 6310,
        },
      },
      {
        shape: 'circle',
        coords: {
          x: 2452,
          y: 6067,
          r: 241,
        },
      },
    ],
  },

  servantsRoom: {
    code: '7A',
    name: "Servants' Room",
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
              This undecorated bedroom contains a pair of beds with
              straw-stuffed mattresses. At the foot of each bed is a closed foot
              locker. A door to the left appears to lead to a closet.
            </p>
            <p>
              In the right-hand corner stands a small wooden door, a metal
              button set into the wall beside it. A basket full of unwashed
              laundry appears to have been left beside it.
            </p>
          </>
        ),
      },
    ],

    checks: [
      {
        skills: ['Investigation'],
        target: 'Dumbwaiter',
        dc: 10,
        success:
          'The button is rigged to a system of wires that rings a bell in the kitchen.',
      },
    ],

    items: [
      {
        name: 'Laundry basket',
        notes: ["Contains men's clothing, except one smaller woman's slip"],
      },
      {
        name: 'Footlockers',
        quantity: 2,
      },
      {
        name: 'Beds',
        quantity: 2,
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 2389,
          y1: 5331,
          x2: 2708,
          y2: 5816,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 2631,
          y1: 5816,
          x2: 2708,
          y2: 5886,
        },
      },
    ],
  },

  servantsCloset: {
    code: '7B',
    name: "Servants' Room - Closet",
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
            The closet within only contains servants' uniforms hanging in
            darkness.
          </p>
        ),
      },
    ],

    items: [
      {
        name: "Servants' uniforms",
        quantity: 4,
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 2224,
          y1: 5658,
          x2: 2376,
          y2: 5816,
        },
      },
    ],
  },

  // @TODO creatures, checks, items, notes
  library: {
    code: '8',
    name: 'Library',
    lighting: {
      day: 'Dim light',
      between: 'Darkness',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Entry',
        text: (
          <>
            <p>
              Red velvet drapes cover the windows of this room. An exquisite
              mahogany desk and a matching high-back chair face the entrance and
              the fireplace, above which hangs a framed picture of a windmill
              perched atop a rocky crag. Situated in corners of the room are two
              overstuffed chairs.
            </p>
            <p>
              Floor-to-ceiling bookshelves line the south wall. A rolling wooden
              ladder allows one to more easily reach the high shelves.
            </p>
          </>
        ),
      },
    ],

    handouts: [
      {
        text: 'Note from Klara',
        url: 'https://www.strahdreloaded.com/Act+I+-+Into+the+Mists/Arc+A+-+Escape+From+Death+House#Library',
      },
    ],

    opportunities: [
      'Inserting the amber shard in to the niche opens the hidden door into the secret room.',
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 1729,
          y1: 5176,
          x2: 2376,
          y2: 5650,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 1900,
          y1: 5650,
          x2: 2213,
          y2: 5816,
        },
      },
    ],
  },

  // @TODO creatures, checks, items, notes
  secretRoom: {
    code: '9',
    name: 'Secret Room',
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
            This small hidden room is packed with bookshelves groaning with old
            and ominous-looking leather-bound tomes. A heavy wooden chest with
            clawed iron feet stands against the south wall, its lid half-closed.
            Sticking out of the chest, its ribs and head caught beneath the lid,
            is a skeleton in leather armor.
          </p>
        ),
      },
    ],

    opportunities: [
      "When Strahd's letter is read, the secret stairs to the basement are conjured, but still require a skill check to find.",
    ],

    handouts: [
      {
        text: 'Letter from Strahd',
        url: 'https://www.strahdreloaded.com/Act+I+-+Into+the+Mists/Arc+A+-+Escape+From+Death+House#Secret+Room',
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 2389,
          y1: 5176,
          x2: 2708,
          y2: 5320,
        },
      },
    ],
  },

  // @TODO creatures, checks, items, notes
  conservatory: {
    code: '10',
    name: 'Conservatory',
    lighting: {
      day: 'Dim light',
      between: 'Darkness',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Entry',
        text: (
          <>
            <p>
              You enter into an elegantly appointed hall, the windows of which
              are covered by gossamer drapes. A brass-plated chandelier hangs
              from the ceiling, and upholstered chairs line the walls.
            </p>
            <p>
              Several stained-glass wall hangings depict beautiful men, women,
              and children singing and playing instruments. A harpsichord with a
              bench rests in the northwest corner. Near the fireplace is a large
              standing harp. Alabaster figurines of well-dressed dancers adorn
              the mantelpiece.
            </p>
          </>
        ),
      },
      {
        prompt: 'Harpsichord',
        text: (
          <>
            <p>
              As you press your fingers to the keys, the notes echo, a haunting
              melody filling the quiet, dusty room. As you continue to play, the
              music seems to take on a life of its own, your hands moving across
              the keys unbidden as if guided by an unseen force.
            </p>
            <p>
              From the edges of the room, spectral figures begin to materialize,
              spinning and weaving in a ghostly dance as though led by the song.
              Most are unfamiliar to you, but you recognize two: Elisabeth
              Durst, in the corner, watching Gustav's apparition dancing with a
              beautiful young woman wearing humble clothes.
            </p>
            <p>
              The eyes of Elisabeth's apparition narrow into a cold, furious
              stare. The dancers pay her little heed, however, the song growing
              faster as the spirits whirl to the rhythm of the harpsichord's
              crescendo.
            </p>
            <p>
              With a swift movement, Elisabeth reaches for a pendant around her
              spectral neck—a shimmering amber shard hung on a cord of ethereal
              mist. As her ghostly fist curls around it, her eyes flash a
              bright, menacing amber—and the spectral dancers dissipate, swept
              away as if by an unseen wind.
            </p>
            <p>
              Elisabeth's apparition lingers but a moment longer before
              disappearing with the rest. As it does, a sound resonates through
              the room: the low sound of scraping wood, originating from the
              room across the hall. The floor trembles faintly—and you hear a
              crash from the mantelpiece. Two of the alabaster figurines have
              fallen from their place on the shelf: one, toppled over on its
              side; the other, shattered across the floor.
            </p>
          </>
        ),
      },
    ],

    opportunities: [
      'Starting to play the harpsichord triggers a scene to unfold (see descriptions), and then swings the bookshelf in the library open.',
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 1729,
          y1: 6320,
          x2: 2708,
          y2: 6973,
        },
      },
    ],
  },
};

export default secondFloorRegions;
