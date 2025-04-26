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
          statBlock: {
            text: 'Swarm of Insects',
            url: 'https://www.dndbeyond.com/monsters/5195224-swarm-of-insects',
          },
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

    initiatesQuarters: {
      code: '24',
      name: "Cult Initiates' Quarters",
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
              A wooden table and four chairs stand at the east end of this room.
              Meanwhile to the west you see four alcoves containing straw
              pallets, each overtaken by mold.
            </p>
          ),
        },
      ],

      items: [
        {
          name: 'Wooden table',
        },
        {
          name: 'Wooden chairs',
          quantity: 4,
        },
        {
          name: 'Straw pallets',
          quantity: 4,
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3227,
            y1: 734,
            x2: 3686,
            y2: 1526,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 3054,
            y1: 1056,
            x2: 3519,
            y2: 1848,
          },
        },
      ],
    },

    well: {
      code: '25',
      name: 'Well and Cultist Quarters',
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
                The ceiling of this dark, earthen chamber rises a foot higher
                than the cramped tunnel. It's supported by thick wooden posts
                and cross beams that have rotted with age and bear deep holes
                indicative of hungry insects.
              </p>
              <p>
                Here, a lonely well stands at the center of the room, surrounded
                on three sides by several smaller, alcove-like chambers that
                have been carved into the walls. Old footprints criss-cross the
                floor, leading into the alcoves, around the well, up a staircase
                on the other end of the room, and back upstairs the way you
                came.
              </p>
              <p>
                An old hempen rope attached to a rusted pulley descends past the
                mouth of the well, swaying gently in the stagnant air as if just
                abandoned by an unseen occupant.
              </p>
            </>
          ),
        },
      ],

      items: [
        {
          name: 'Well',
          notes: [
            '4-foot diameter',
            '3-foot high stone lip',
            '30-foot depth',
            'Interior covered by ash-black fungi',
            'If an object is thrown in, it is loudly torn apart when they look away',
          ],
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 2396,
            y1: 1548,
            x2: 3032,
            y2: 2180,
          },
        },
      ],
    },

    cultistQuartersSE: {
      code: '25A',
      name: 'Well and Cultist Quarters - SE Quarters',
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
              A small alcove is carved out, furnished to be quarters, with a
              single bed and wooden chest.
            </p>
          ),
        },
      ],

      checks: [
        {
          skills: ['Sleight of Hand'],
          target: 'Chest',
          dc: 15,
          success: 'The chest is opened',
          notes: ["Thieves' tools proficiency grants advantage"],
        },
      ],

      items: [
        {
          name: 'Bed',
        },
        {
          name: 'Wooden chest',
          notes: ['Locked'],
          items: [
            {
              name: 'GP',
              quantity: 11,
              notes: ['Contained in a pouch made of human skin'],
            },
            {
              name: 'SP',
              quantity: 60,
              notes: ['Contained in a pouch made of human skin'],
            },
          ],
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 2567,
            y1: 1216,
            x2: 2865,
            y2: 1526,
          },
        },
      ],
    },

    cultistQuartersNE: {
      code: '25B',
      name: 'Well and Cultist Quarters - NE Quarters',
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
              A small alcove is carved out, furnished to be quarters, with a
              single bed and wooden chest.
            </p>
          ),
        },
      ],

      checks: [
        {
          skills: ['Sleight of Hand'],
          target: 'Chest',
          dc: 15,
          success: 'The chest is opened',
          notes: ["Thieves' tools proficiency grants advantage"],
        },
      ],

      items: [
        {
          name: 'Bed',
        },
        {
          name: 'Wooden chest',
          notes: ['Locked'],
          items: [
            {
              name: 'Moss agate',
              value: '10 gp',
              quantity: 3,
              notes: [
                'Contained in a folded piece of black cloth',
                'Pink gem with mossy gray markings',
              ],
            },
          ],
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 2243,
            y1: 1216,
            x2: 2537,
            y2: 1526,
          },
        },
      ],
    },

    cultistQuartersN: {
      code: '25C',
      name: 'Well and Cultist Quarters - N Quarters',
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
              A small alcove is carved out, furnished to be quarters, with a
              single bed and wooden chest.
            </p>
          ),
        },
      ],

      checks: [
        {
          skills: ['Sleight of Hand'],
          target: 'Chest',
          dc: 15,
          success: 'The chest is opened',
          notes: ["Thieves' tools proficiency grants advantage"],
        },
      ],

      items: [
        {
          name: 'Bed',
        },
        {
          name: 'Wooden chest',
          notes: ['Locked'],
          items: [
            {
              name: 'Black leather eye patch with carnelian sewn in',
              value: '50 gp',
              notes: ['Red brown gem'],
            },
          ],
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 2070,
            y1: 1716,
            x2: 2375,
            y2: 2008,
          },
        },
      ],
    },

    cultistQuartersNW: {
      code: '25D',
      name: 'Well and Cultist Quarters - NW Quarters',
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
              A small alcove is carved out, furnished to be quarters, with a
              single bed and wooden chest.
            </p>
          ),
        },
      ],

      checks: [
        {
          skills: ['Sleight of Hand'],
          target: 'Chest',
          dc: 15,
          success: 'The chest is opened',
          notes: ["Thieves' tools proficiency grants advantage"],
        },
      ],

      items: [
        {
          name: 'Bed',
        },
        {
          name: 'Wooden chest',
          notes: ['Locked'],
          items: [
            {
              name: 'Ivory hairbrush with silver bristles',
              value: '25 gp',
            },
          ],
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 2243,
            y1: 2214,
            x2: 2537,
            y2: 2505,
          },
        },
      ],
    },

    cultistQuartersSW: {
      code: '25E',
      name: 'Well and Cultist Quarters - SW Quarters',
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
              A small alcove is carved out, furnished to be quarters, with a
              single bed and wooden chest.
            </p>
          ),
        },
      ],

      checks: [
        {
          skills: ['Sleight of Hand'],
          target: 'Chest',
          dc: 15,
          success: 'The chest is opened',
          notes: ["Thieves' tools proficiency grants advantage"],
        },
      ],

      items: [
        {
          name: 'Bed',
        },
        {
          name: 'Wooden chest',
          notes: ['Locked'],
          items: [
            {
              name: 'Black leather-bound book',
              notes: [
                'List of sacrifices',
                'Descriptions: "Struggled profusely," "no sedative given"',
                'Each ends with "Fed to Walter"',
                'Signed by Drasha',
              ],
            },
          ],
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 2567,
            y1: 2214,
            x2: 2865,
            y2: 2505,
          },
        },
      ],
    },

    spikedPit: {
      code: '26',
      name: 'Hidden Spiked Pit',
      lighting: {
        day: 'Darkness',
        between: 'Darkness',
        night: 'Darkness',
      },

      descriptions: [
        {
          prompt: 'Entry from Well',
          text: (
            <>
              <p>
                The staircase leads to a quiet landing. In front of you, the
                stairs continue upward and vanish around a bend. To the right,
                the landing continues straight into a lonely corridor. This
                tunnel hallway seems surprisingly clean and bereft of debris; at
                its far end, another earthen staircase descends into darkness.
              </p>
              <p>
                The incessant chanting that has filled the air of this
                underground complex grows stronger toward the far end of this
                corridor. Its source seems to lie beyond the descending stairs.
              </p>
            </>
          ),
        },
        {
          prompt: 'Entry from Dining Hall',
          text: (
            <>
              <p>
                The staircase descends to a quiet landing. In front of you, the
                stairs continue to descend, opening into a broader chamber. To
                the left, the landing continues straight into a lonely corridor.
                This tunnel hallway seems surprisingly clean and bereft of
                debris; at its far end, another earthen staircase descends into
                darkness.
              </p>
              <p>
                The incessant chanting that has filled the air of this
                underground complex grows stronger toward the far end of this
                corridor.
              </p>
            </>
          ),
        },
        {
          prompt: 'Entry from Ghoul Hall',
          text: (
            <>
              <p>
                The staircase descends to a quiet landing. To the left, the
                stairs continue to descend, rounding a bend before vanishing
                into darkness. The incessant chanting that has filled the air of
                this underground complex appears to be echoing from below.
              </p>
              <p>
                To the right, the landing continues straight into a lonely
                corridor. This tunnel hallway seems surprisingly clean and
                bereft of debris; at its far end, the corridor branches left and
                right.
              </p>
            </>
          ),
        },
      ],

      checks: [
        {
          skills: ['Perception'],
          target: 'Tunnel',
          dc: 15,
          success: "Unlike other tunnels, this one doesn't have any footprints",
        },
      ],

      items: [
        {
          name: 'Pit',
          notes: [
            '5 feet long',
            '10 feet deep',
            '1d6 bludgeoning damage + 2d10 piercing damage',
          ],
        },
      ],

      notes: [
        'Chanting is louder, still unclear',
        'Checking the floor specifically reveals the pit',
      ],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3380,
            y1: 2047,
            x2: 3519,
            y2: 2844,
          },
        },
      ],
    },

    diningHall: {
      code: '27',
      name: 'Dining Hall',
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
                This room contains a plain wooden table flanked by long benches.
                Moldy humanoid bones lie strewn on the dirt floor. A thick
                stench of rot and gore fills the chamber, so coppery with blood
                that you can taste it on your tongue.
              </p>
              <p>
                A few dozen moldy bones have been piled into a grotesque and
                misshapen pyramid in a dark alcove to the south.
              </p>
            </>
          ),
        },
      ],

      checks: [
        {
          skills: ['Perception'],
          target: 'Larder',
          dc: 17,
          success:
            'There is some kind of creature coiled on the ceiling of the alcove, poised to attack',
        },
      ],

      items: [
        {
          name: 'Wooden table',
        },
        {
          name: 'Wooden benches',
          quantity: 2,
        },
        {
          name: 'Moldy humanoid bones',
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3872,
            y1: 2047,
            x2: 4518,
            y2: 2505,
          },
        },
      ],
    },

    larder: {
      code: '28',
      name: 'Larder',
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
                A horrific creature drops from the ceiling—a long, flesh-like
                worm the breadth and length of a human man, its trunk resembling
                a humanoid body with its arms sewn to its torso and both legs
                sewn together. Its flayed muscles split open to reveal a
                flapping, gaping maw ringed by hundreds of tiny, human-like
                teeth and a gnashing, bony beak.
              </p>
              <p>
                It lets out a high-pitched, gurgling squeal as it hurls itself
                forward, writhing, tendon-like tentacles lashing toward your
                face.
              </p>
            </>
          ),
        },
      ],

      creatures: [
        {
          name: 'Grick',
          statBlock: {
            3: {
              text: 'Grick (3P)',
            },
            4: {
              url: 'https://www.dndbeyond.com/monsters/5360510-grick-4p',
              text: 'Grick (4P)',
            },
            5: {
              url: 'https://www.dndbeyond.com/monsters/5195061-grick',
              text: 'Grick',
            },
            6: {
              url: 'https://www.dndbeyond.com/monsters/5353579-grick-6p',
              text: 'Grick (6P)',
            },
          },
          trigger: 'Entry',
          combatBehavior: 'Attacks most obvious threat until defeated',
        },
      ],

      notes: [
        'Chanting is indiscernible',
        'PCs with passive perception below 12 are surprised',
      ],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 4528,
            y1: 2214,
            x2: 4682,
            y2: 2349,
          },
        },
      ],
    },

    ghoulHall: {
      code: '29',
      name: 'Ghoulish Encounter',
      lighting: {
        day: 'Darkness',
        between: 'Darkness',
        night: 'Darkness',
      },

      descriptions: [
        {
          prompt: 'Approach',
          text: (
            <p>
              A deathly stench emanates from this corridor. The stone walls bear
              cracked, red stains, and a trail of old bones leads deeper down
              the tunnel.
            </p>
          ),
        },
        {
          prompt: 'Continuing further',
          text: (
            <p>
              The trail ends at the center of a quiet intersection. The
              incessant chanting you've heard since first entering the dungeon
              is noticeably louder down the northern branch of the intersection.
            </p>
          ),
        },
      ],

      creatures: [
        {
          name: 'Ghoul',
          quantity: {
            3: 1,
            4: 2,
            5: 3,
            6: 4,
          },
          statBlock: {
            url: 'https://www.dndbeyond.com/monsters/5195060-ghoul',
            text: 'Ghoul',
          },
          trigger: 'Trigger points (see notes)',
          combatBehavior: 'Move to choke point and attack character in front',
        },
      ],

      notes: [
        'Chanting is louder, still unclear',
        'Trigger points are the two spaces that are two spaces before the intersection',
        'Xes on map are wrong - use Reloaded',
      ],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3872,
            y1: 2535,
            x2: 4016,
            y2: 3332,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 4016,
            y1: 2535,
            x2: 4178,
            y2: 2675,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 3552,
            y1: 2705,
            x2: 4346,
            y2: 2844,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 4209,
            y1: 2844,
            x2: 4346,
            y2: 3005,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 4016,
            y1: 3203,
            x2: 4346,
            y2: 3333,
          },
        },
      ],
    },
  },
};

export default deathHouseData;
