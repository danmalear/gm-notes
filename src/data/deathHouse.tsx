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
            <p>
              Looking back outside, you find that the exterior of the house has
              been fully surrounded by enormous, fleshy tendrils, extruding from
              beneath the house.
            </p>
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
            <p>
              Just inside the front door is a grand foyer. In contrast to the
              decrepit look of the house from outside, the interior seems
              well-preserved and maintained. The wall to your right bears a
              polished shield with a windmill coat of arms, flanked by elegant
              portraits of aristocrats. Through a pair of open doors ahead, you
              can see a well-appointed hall, lit warmly by a fireplace.
            </p>
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

    // ...

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
                hunch your shoulders and pull in your elbows to continue
                downward. In the darkness, you can only hear the shuffle of your
                feet, the choking groan of the stairs, and the pounding of your
                blood in your ears.
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

    dungeonAccess: {
      code: '22',
      name: 'Dungeon Level Access',
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
                Finally, after what feels like hours, the descent levels out,
                and the spiral staircase ends at a darkened landing of packed
                earth. A narrow tunnel supported by aged timber braces stretches
                ahead of you, its stone walls seeming to bleed with deposits of
                streaked, red clay. Eight feet ahead, the tunnel splits,
                branching to the left and right.
              </p>
              <p>
                As your eyes and ears adjust to the cold, subterranean corridor,
                you notice that the tunnel isn't as silent as the staircase
                above. An eerie, low-pitched sound echoes through the space—and
                you soon recognize it as a deep, incessant chanting.
              </p>
            </>
          ),
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3862,
            y1: 1216,
            x2: 4028,
            y2: 1356,
          },
        },
      ],
    },

    crypts: {
      code: '23',
      name: 'Family Crypts',
      lighting: {
        day: 'Darkness',
        between: 'Darkness',
        night: 'Darkness',
      },

      descriptions: [
        {
          prompt: 'A + B Corridor',
          text: (
            <>
              <p>
                This side corridor branches again to the left and right. On
                either side, large standing stone slabs have been set aside to
                lean against the walls, opening the way to a pair of dark, quiet
                crypts. The slab to the right is etched with the name "Walter
                Durst"; the slab to the left is blank.
              </p>
            </>
          ),
        },
        {
          prompt: 'C + D Corridor',
          text: (
            <>
              <p>
                This side corridor branches again to the left and right. Large
                standing stone slabs seal the entrance to the tunnels on either
                side, blocking the way forward. The slab to the left is etched
                with the name "Gustav Durst"; the slab to the right is etched
                with the name "Elisabeth Durst." The tunnel here is unnaturally
                quiet, and a thin mist clings to the floor.
              </p>
            </>
          ),
        },
        {
          prompt: 'E + F Corridor',
          text: (
            <>
              <p>
                This side corridor branches again to the left and right. Large
                standing stone slabs seal the entrance to the tunnels on either
                side, blocking the way forward. The slab to the left is etched
                with the name "Rosavalda Durst"; the slab to the right is etched
                with the name "Thornboldt Durst." Each slab exudes the silence
                of a forgotten grave.
              </p>
            </>
          ),
        },
      ],

      checks: [
        {
          skills: ['Athletics'],
          target: 'Slab',
          dc: 15,
          success: 'The slab is pushed aside',
          notes: ['Using crowbar or similar grants advantage'],
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3698,
            y1: 888,
            x2: 4178,
            y2: 1034,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 4040,
            y1: 1034,
            x2: 4178,
            y2: 2022,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 4178,
            y1: 1050,
            x2: 4368,
            y2: 1198,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 4368,
            y1: 888,
            x2: 4516,
            y2: 1358,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 4016,
            y1: 1716,
            x2: 4370,
            y2: 1848,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 3872,
            y1: 1546,
            x2: 4016,
            y2: 2008,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 4370,
            y1: 1546,
            x2: 4518,
            y2: 2008,
          },
        },
      ],
    },

    emptyCrypt: {
      code: '23A',
      name: 'Empty Crypt',
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
              You peer past the leaning stone slab to see an empty earthen
              crypt.
            </p>
          ),
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 4528,
            y1: 888,
            x2: 4838,
            y2: 1034,
          },
        },
      ],
    },

    waltersCrypt: {
      code: '23B',
      name: "Walter's Crypt",
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
              Swollen, bloody cysts cover the walls of this crypt like tumors.
              From time to time, they pulsate and burst, streams of pus oozing
              down to collect on the floor. Each time they do, you can hear an
              infant's quiet whimpers, which are swiftly quieted by the sound of
              distant humming.
            </p>
          ),
        },
      ],

      notes: [
        'Chanting is indiscernible',
        'Humming is Waltz for Klara (tune from harpsichord)',
      ],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 4528,
            y1: 1216,
            x2: 4838,
            y2: 1356,
          },
        },
      ],
    },

    gustavsCrypt: {
      code: '23C',
      name: "Gustav's Crypt",
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
              The crypt beyond the slab contains a stone coffin lying atop a
              dusty stone bier. Silence hangs heavy over the lonely chamber.
            </p>
          ),
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 4528,
            y1: 1546,
            x2: 4838,
            y2: 1692,
          },
        },
      ],
    },

    elisabethsCrypt: {
      code: '23D',
      name: "Elisabeth's Crypt",
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
              A thick, acrid miasma hangs over the interior of this crypt, which
              holds a stone-carved coffin resting atop a stone bier. The floor
              before it is littered with the bodies of hundreds of dead
              termites. Many cling to the elongated, bloated body of a dead
              termite queen, while others appear to have died atop the scarred,
              mutilated bodies of four larger beetles not far away.
            </p>
          ),
        },
      ],

      creatures: [
        {
          name: 'Swarm of Centipedes',
          quantity: 1,
          statBlockUrl:
            'https://www.dndbeyond.com/monsters/5195224-swarm-of-insects',
          statBlockText: 'Swarm of Insects',
          trigger: 'Coffin is disturbed',
          combatBehavior: 'Attacks nearest creature(s) until defeated',
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 4528,
            y1: 1872,
            x2: 4838,
            y2: 2008,
          },
        },
      ],
    },

    rosesCrypt: {
      code: '23E',
      name: "Rose's Crypt",
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
              This small chamber contains a stone coffin resting on a stone
              bier. The air in this crypt hangs heavy with sorrow.
            </p>
          ),
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3552,
            y1: 1546,
            x2: 3858,
            y2: 1692,
          },
        },
      ],
    },

    thornsCrypt: {
      code: '23F',
      name: "Thorn's Crypt",
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
              This small chamber contains a stone coffin resting on a stone
              bier. The air in this crypt hangs heavy with sorrow.
            </p>
          ),
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3552,
            y1: 1872,
            x2: 3858,
            y2: 2008,
          },
        },
      ],
    },
  },
};

export default deathHouseData;
