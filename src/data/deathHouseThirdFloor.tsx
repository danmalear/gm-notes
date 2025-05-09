import type { Region } from './MapData.ts';

const thirdFloorRegions: {
  [key: string]: Region;
} = {
  // @TODO checks, items, notes
  interiorBalcony: {
    code: '11',
    name: 'Balcony',
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
              You climb the red marble staircase to its full height, arriving at
              a dusty balcony. The air here is dry and musty, but tinged with a
              strange, coppery scent.
            </p>
            <p>
              A suit of black plate armor stands against one wall, draped in
              cobwebs and marked by age. Oil lamps are mounted on the faded
              oak-paneled walls, which are carved with woodland scenes of trees,
              falling leaves, and tiny beasts.
            </p>
          </>
        ),
      },
    ],

    creatures: [
      {
        name: 'Animated armor',
        trigger: 'Creature gets within reach',
        statBlock: {
          '3': { text: 'Animated Armor (3P)' },
          '4': { text: 'Animated Armor (4P)' },
          '5': {
            text: 'Animated Armor',
            url: 'https://www.dndbeyond.com/monsters/5194893-animated-armor',
          },
          '6': { text: 'Animated Armor (6P)' },
        },
        combatBehavior:
          'Attempts to shove the creature over the railing, and then it fights until defeated',
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 744,
          y1: 3682,
          x2: 1136,
          y2: 4169,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 744,
          y1: 3675,
          x2: 897,
          y2: 3682,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 584,
          y1: 3517,
          x2: 897,
          y2: 3675,
        },
      },
      {
        shape: 'circle',
        coords: {
          x: 1136,
          y: 3926,
          r: 241,
        },
      },
    ],
  },

  // @TODO checks, items, notes
  masterBedroom: {
    code: '12A',
    name: 'Master Suite - Bedroom',
    lighting: {
      day: 'Dim light',
      between: 'Darkness',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Approach',
        text: (
          <>
            <p>
              These grand doors loom tall, their dark wood frames enclosing a
              pair of dusty stained-glass windows. Each pane is etched with
              intricate designs that resemble windmills, their once-vibrant hues
              now faded and obscured beneath a thick veil of grime.
            </p>
            <p>
              Through the dusty haze that prickles your eyes, you catch a
              glimpse of something through the windows: a silhouette, standing
              mere inches behind the glass, lit from behind by a dim, amber
              glow. It's still and unmoving, but the mere sight of it seizes
              your muscles in a vice-like grip, your limbs refusing to obey your
              conscious mind.
            </p>
            <p>
              The air around you thickens, its temperature plummeting to a
              bone-chilling cold. Your breath fogs the glass panes, a delicate
              frost creeping across them as the house's distant creaks and
              whispers are swallowed by a heavy silence.
            </p>
            <p>
              The shadow behind the door is nearly formless—insubstantial—but
              its presence invokes a primordial dread deep within your marrow.
              Your heart beats faster, sweat beading on your forehead, pulse
              racing through your veins. Slowly, the silhouette begins to turn
              its head toward yours.
            </p>
            <p>
              [Feign coming out of spacing out] Sorry, lost my train of thought.
              You were heading through the ornate doors, right?
            </p>
          </>
        ),
      },
      {
        prompt: 'Entry',
        text: (
          <>
            <p>
              You enter a dusty, cobweb-filled master bedroom with burgundy
              drapes covering the windows. A four-poster bed with embroidered
              curtains and tattered gossamer veils stands against the center
              wall.
            </p>
            <p>
              A door facing the foot of the bed has a faded full-length mirror
              mounted on it. In the right-hand corner of the room stands a small
              wooden door, its surface half-rotted by age. A tarnished metal
              button is set into the wall beside it.
            </p>
            <p>
              A rotting tiger-skin rug lies on the floor in front of the
              fireplace, which has a dust-covered portrait of the man and woman
              from the first-floor portrait hanging above it. A web-filled
              parlor in the southwest corner contains two chairs and a table
              holding several items, as well as a door with a dark, dirt-flecked
              window.
            </p>
            <p>
              The room also contains a matching pair of wardrobes, a padded
              chair, and a vanity with a wood-framed mirror and a silver jewelry
              box. A soft amber glow emanates from beneath the jewelry box's
              lid.
            </p>
          </>
        ),
      },
    ],

    handouts: [
      {
        text: 'Note for Drasha',
        url: 'https://www.strahdreloaded.com/Act+I+-+Into+the+Mists/Arc+A+-+Escape+From+Death+House#Master+Suite',
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 413,
          y1: 3035,
          x2: 1219,
          y2: 3509,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 908,
          y1: 2976,
          x2: 1060,
          y2: 3035,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 1073,
          y1: 3363,
          x2: 1392,
          y2: 3675,
        },
      },
      {
        shape: 'rect',
        coords: {
          x1: 1315,
          y1: 3675,
          x2: 1392,
          y2: 3745,
        },
      },
    ],
  },

  // @TODO checks, items, notes
  masterCloset: {
    code: '12B',
    name: 'Master Suite - Closet',
    lighting: {
      day: 'Darkness',
      between: 'Darkness',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Entry',
        text: <p>Inside the closet, you see nothing but darkness.</p>,
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 908,
          y1: 3517,
          x2: 1060,
          y2: 3675,
        },
      },
    ],
  },

  // @TODO checks, items, notes
  masterBalcony: {
    code: '12C',
    name: 'Master Suite - Balcony',
    lighting: {
      day: 'Bright light',
      between: 'Dim light',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Entry (first time outdoors)',
        text: (
          <>
            <p>
              As you open the door, the first thing that hits you is a rank
              smell, like old meat. Its source is obvious: fully surrounding the
              balcony you find yourself on, as well as the entire exterior of
              the house, you see enormous, fleshy tendrils, extruding from
              beneath the manor and tightly packed together, forming a solid
              wall.
            </p>
            <p>
              Other than that, the balcony is empty, and looking up you can see
              the attic extending above you, with a boarded up window visible
            </p>
          </>
        ),
      },
      {
        prompt: 'Entry',
        text: (
          <p>
            The door leads out to a small exterior balcony, the view only of the
            fleshy tendrils that surround the house. Nothing else is immediately
            visible.
          </p>
        ),
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 1247,
          y1: 3035,
          x2: 1392,
          y2: 3335,
        },
      },
    ],
  },

  // @TODO checks, items, notes
  bathroom: {
    code: '13',
    name: 'Bathroom',
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
            The door opens to a dark bathroom, containing a wooden tub with
            clawed feet, a small iron stove with a kettle resting atop it, and a
            barrel under a spigot.
          </p>
        ),
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 413,
          y1: 3682,
          x2: 737,
          y2: 4000,
        },
      },
    ],
  },

  // @TODO checks, items, notes
  storageRoom1: {
    code: '14',
    name: 'Storage Room (Third Floor)',
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
            Dusty shelves line the walls of this room. A few of the shelves have
            folded sheets, blankets, and old bars of soap on them. A
            cobweb-covered broom leans against the far wall.
          </p>
        ),
      },
    ],

    creatures: [
      {
        name: 'Broom of animated attack',
        trigger: 'A creature within reach looks away',
        statBlock: {
          text: 'Broom of Animated Attack',
          url: 'https://www.dndbeyond.com/monsters/5194893-animated-armor',
        },
        combatBehavior:
          'Whacks creature on the back of the head, then goes immobile, rinse repeat until detected. When engaged, fights until defeated.',
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 413,
          y1: 4013,
          x2: 737,
          y2: 4169,
        },
      },
    ],
  },

  // @TODO checks, items, notes
  nursemaidsBedroom: {
    code: '15A',
    name: "Nursemaid's Suite - Bedroom",
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
              Dust and cobwebs shroud this elegantly appointed bedroom. A large
              bed stands against the far wall, its once-opulent coverings now
              faded and threadbare.
            </p>
            <p>
              Beside the bed, a mildew-covered towel covers most of a dusty
              yellowed book on one of its two end tables. On the far side of the
              room, you can see a pair of two more stained-glass doors, their
              windows flecked with dirt and grime.
            </p>
            <p>
              To the left stands an empty wardrobe, its doors slightly ajar.
              Mounted beside it stands a full-length mirror, its wooden frame
              carved to resemble ivy and berries. To the right stands a closed
              door.
            </p>
            <p>
              As you look around the room, you notice that the blankets atop the
              bed lift slightly away from the mattress, as though something is
              lying atop the mattress beneath. As you watch, you can see the
              coverings, almost imperceptibly, slowly rise and fall with low,
              rhythmic rustling.
            </p>
          </>
        ),
      },
      {
        prompt: 'Mirror',
        text: (
          <>
            <p>
              As you approach the mirror, a form fades into view, overtaking the
              reflection that was previously visible. The form takes the shape
              of a woman, horribly emaciated and gaunt, with all of her fingers
              and toes removed, her eyes sewn shut, and no lips or teeth, scars
              decorating her entire body and her hair hacked to stubble
            </p>
          </>
        ),
      },
    ],

    opportunities: [
      'Approaching the mirror reveals the spirit of Klara; asking for her help causes her to swing open the secret door behind the mirror.',
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 747,
          y1: 4179,
          x2: 1392,
          y2: 4832,
        },
      },
    ],
  },

  // @TODO checks, items, notes
  nursery: {
    code: '15B',
    name: "Nursemaid's Suite - Nursery",
    lighting: {
      day: 'Dim light',
      between: 'Darkness',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Approach',
        text: (
          <>
            <p>
              Moving towards the door, you hear the faint sound of a woman
              humming from within. [heard]It sounds like the song from the sheet
              music in the harpsichord, Waltz for Klara[/heard]
            </p>
          </>
        ),
      },
      {
        prompt: 'Entry',
        text: (
          <>
            <p>
              The air in this small nursery is strangely warm and tinged with a
              coppery scent. Blood-red runes cover the walls, arranged in
              concentric circles around the crib in the center, which seems to
              have a name carved into its side. Strange, flesh-like tumors have
              grown along the floor around it in sparse clusters, and slowly
              pulsate as if they're breathing.
            </p>
            <p>
              Looking down, you notice that a small object seems to have fallen
              beneath the crib. In the distance, you can faintly hear the sound
              of an infant's soft whimpering.
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
          y1: 4179,
          x2: 737,
          y2: 4490,
        },
      },
    ],
  },

  // @TODO checks, items, notes
  nursemaidsBalcony: {
    code: '15C',
    name: "Nursemaid's Suite - Balcony",
    lighting: {
      day: 'Bright light',
      between: 'Dim light',
      night: 'Darkness',
    },

    descriptions: [
      {
        prompt: 'Entry (first time outdoors)',
        text: (
          <>
            <p>
              As you open the door, the first thing that hits you is a rank
              smell, like old meat. Its source is obvious: fully surrounding the
              balcony you find yourself on, as well as the entire exterior of
              the house, you see enormous, fleshy tendrils, extruding from
              beneath the manor and tightly packed together, forming a solid
              wall.
            </p>
            <p>
              Other than that, the balcony is empty, and looking up you can see
              the attic extending above you, with two windows visible
            </p>
          </>
        ),
      },
      {
        prompt: 'Entry',
        text: (
          <p>
            The door leads out to a small exterior balcony, the view only of the
            fleshy tendrils that surround the house. Nothing else is immediately
            visible.
          </p>
        ),
      },
    ],

    areas: [
      {
        shape: 'rect',
        coords: {
          x1: 413,
          y1: 4520,
          x2: 737,
          y2: 4832,
        },
      },
    ],
  },
};

export default thirdFloorRegions;
