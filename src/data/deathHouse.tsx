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

    mainHall: {
      code: '2A',
      name: 'Main Hall',
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
                As soon as you enter the main hall, the front door to the house
                slams shut, and all of the lights you can see immediately
                extinguish. The pitter-patter of rain outside ceases, leaving
                the house in a deathly silence. On the right, above a marble
                staircase spiralling up to the upper levels, unnaturally
                illuminated letters appear in blood, one by one, spelling out a
                poem: [HANDOUT: Poem]
              </p>
              <p>
                A grandfather clock in the center of the stairwell tolls six
                times. Glancing around, you see that the walls comprise
                intricately carved wooden panels. Above the recently
                extinguished fireplace, a family portrait hangs, with a
                descriptive plaque underneath. You also see several doors
                leading out from the hall in addition to the one behind you.
              </p>
            </>
          ),
        },
      ],

      checks: [
        {
          skills: ['Insight'],
          target: 'Portrait',
          dc: 10,
          success:
            'The mother in the portrait is regarding the baby with a hint of scorn.',
        },
        {
          skills: ['Perception'],
          target: 'Walls',
          dc: 12,
          success:
            'Worked into the wood panel carvings are hidden serpents and skulls.',
        },
      ],

      items: [
        {
          name: 'Family portrait',
          notes: ['Portrays the Durst family'],
        },
        {
          name: 'Wooden panels',
          notes: ['Portray vines, flowers, nymphs, and satyrs'],
        },
        {
          name: 'Grandfather clock',
          notes: ['Sits in the center of the stairwell (not on map)'],
        },
      ],

      handouts: [
        {
          text: 'Poem',
          url: 'https://www.strahdreloaded.com/Act+I+-+Into+the+Mists/Arc+A+-+Escape+From+Death+House#Main+Hall',
        },
      ],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 413,
            y1: 5823,
            x2: 1392,
            y2: 6310,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 908,
            y1: 5658,
            x2: 1060,
            y2: 5823,
          },
        },
      ],
    },

    cloakroom: {
      code: '2B',
      name: 'Cloakroom',
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
              Several black cloaks hang in this small closet, with a top hat
              sitting on an upper shelf. An envelope protrudes from the pocket
              of one of the cloaks.
            </p>
          ),
        },
      ],

      items: [
        {
          name: 'Envelope',
          notes: ['Contains the Invitation handout'],
        },
        {
          name: 'Cloaks',
          quantity: 4,
        },
        {
          name: 'Top hat',
        },
      ],

      handouts: [
        {
          text: 'Invitation',
          url: 'https://www.strahdreloaded.com/Act+I+-+Into+the+Mists/Arc+A+-+Escape+From+Death+House#Cloakroom',
        },
      ],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 744,
            y1: 5658,
            x2: 897,
            y2: 5816,
          },
        },
      ],
    },

    denOfWolves: {
      code: '3',
      name: 'Den of Wolves',
      lighting: {
        day: 'Dim light',
        between: 'Darkness',
        night: 'Darkness',
      },

      descriptions: [
        {
          prompt: 'Opening door',
          text: (
            <p>
              As you crack the door to this room open, you catch a glimpse of
              something feral beyond: an amber eye that flashes in the darkness,
              and a bestial muzzle curled into a snarl.
            </p>
          ),
        },
        {
          prompt: 'Entry',
          text: (
            <>
              <p>
                The door cracks open, revealing a gray-furred wolf frozen into
                place. It's only a moment before you realize that it's not
                moving—and another before you realize that it's not alone.
              </p>
              <p>
                This oak-paneled room looks like a hunter's den. Mounted above a
                fireplace is a stag's head, and positioned around the outskirts
                of the room are two additional stuffed wolves—a large gray wolf
                and a smaller brown wolf.
              </p>
              <p>
                Two padded chairs draped in animal furs face the hearth, with an
                oak table between them supporting an assortment of objects. A
                chandelier hangs above a cloth-covered table surrounded by four
                chairs, and two cabinets stand against the walls. A pair of
                small toys seems to have been forgotten beneath one of the
                chairs.
              </p>
            </>
          ),
        },
        {
          prompt: 'Looking back at wolves',
          text: (
            <p>
              When you turn back around, you see that the wolves are no longer
              in the same positions they were before. The larger wolf and the
              smaller brown wolf now stand beside each other, while the smaller
              gray wolf has turned its snarl toward the other two.
            </p>
          ),
        },
      ],

      checks: [
        {
          skills: ['Nature'],
          target: 'Stuffed wolves',
          dc: 7,
          success: 'The wolves are dead and stuffed.',
        },
        {
          skills: ['Nature'],
          target: 'Stuffed wolves',
          dc: 12,
          success:
            'The large, gray wolf is a male, the smaller ones are female.',
        },
        {
          skills: ['Sleight of Hand'],
          target: 'East cabinet',
          dc: 15,
          success: 'The cabinet is unlocked',
          notes: ["Thieves' tools proficiency grants advantage"],
        },
      ],

      items: [
        {
          name: 'North cabinet',
          notes: ['Unlocked'],
          items: [
            {
              name: 'Needlework',
              notes: [
                'Depicts boy and girl holding hands with young woman',
                '"FOR MISS KLARA" in clumsy writing',
                "Young woman's face is slashed out",
                'Mounted',
              ],
            },
            {
              name: 'Deck of cards',
              notes: ['Contained in a small box'],
            },
            {
              name: 'Wine glasses',
              quantity: 12,
            },
          ],
        },
        {
          name: 'East cabinet',
          notes: ['Locked'],
          items: [
            {
              name: 'Heavy crossbow',
            },
            {
              name: 'Light crossbow',
            },
            {
              name: 'Hand crossbow',
            },
            {
              name: 'Crossbow bolts',
              quantity: 60,
            },
            {
              name: 'Silvered crossbow bolts',
              quantity: 5,
            },
          ],
        },
        {
          name: 'Stuffed wolves',
          notes: ['Large gray wolf', 'Small brown wolf', 'Small gray wolf'],
        },
        {
          name: 'Toys',
          quantity: 2,
          notes: [
            'Stuffed toy wolves',
            "Each has a child's name sewn on: ROSE and THORN",
          ],
        },
        {
          name: 'Trapdoor',
          notes: ['Impossible to notice from this side'],
        },
        {
          name: 'Padded armchairs',
          quantity: 2,
        },
        {
          name: 'Oak table',
          items: [
            {
              name: 'Cask of wine',
            },
            {
              name: 'Wooden goblets',
              quantity: 2,
            },
            {
              name: 'Pipe rack',
            },
            {
              name: 'Candelabrum',
            },
          ],
        },
        {
          name: 'Stag head',
          notes: ['Mounted above fireplace'],
        },
        {
          name: 'Chandelier',
          notes: ['Hanging above covered table'],
        },
        {
          name: 'Covered table',
        },
        {
          name: 'Chairs',
          quantity: 4,
        },
      ],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 747,
            y1: 6320,
            x2: 1392,
            y2: 6973,
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
            x2: 4368,
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
            x1: 4368,
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

      items: [
        {
          name: 'Empty coffin',
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

      items: [
        {
          name: 'Empty coffin',
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

      items: [
        {
          name: 'Empty coffin',
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

      items: [
        {
          name: 'Empty coffin',
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
            url: 'https://www.dndbeyond.com/monsters/5195009-ghoul',
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
        'While attacking, ghouls say "Beautiful. We\'re so beautiful," We are perfect. We are immortal," and "Help up live forever."',
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

    stairsDown: {
      code: '30',
      name: 'Stairs Down',
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
              A dark set of chiseled stone steps descends into darkness. It's
              clear that the origin of the muffled chanting you've been hearing
              lies below.
            </p>
          ),
        },
      ],

      notes: ['Chanting is louder, still unclear'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3227,
            y1: 2705,
            x2: 3362,
            y2: 3164,
          },
        },
        {
          shape: 'rect',
          coords: {
            x1: 3362,
            y1: 2870,
            x2: 3519,
            y2: 3164,
          },
        },
      ],
    },

    darklordsShrine: {
      code: '31',
      name: "Darklord's Shrine",
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
                This room is festooned with moldy skeletons that hang from rusty
                shackles against the walls, their mouths hanging open in silent
                screams.
              </p>
              <p>
                A wide alcove in the south wall contains a painted wooden statue
                carved in the likeness of a gaunt, pale-faced man wearing a
                voluminous black cloak, his pale left hand resting on the head
                of a wolf that stands beside him. The statue's right hand holds
                a smoky-gray crystal orb, and its painted gaze stares down
                toward you, a cold and cruel glint to its eye.
              </p>
              <p>
                [X] ashen shadows are burned into the walls, with soot marks
                stretching across the floor toward the statue.
              </p>
              <p>
                The room has exits to the west and north. Chanting can be heard
                coming from the north.
              </p>
            </>
          ),
        },
        {
          prompt: 'Approaching the Orb',
          text: (
            <p>
              As you near the orb in the statue's palm, you begin to hear voices
              whispering around you. "His gaze burns upon us. The Darklord's
              eyes are always watching." As you glance around, you see your
              shadow on the floor begin to writhe and twist, its edges growing
              tattered and blurred.
            </p>
          ),
        },
        {
          prompt: 'Touching the Orb',
          text: (
            <p>
              As soon as you make contact with the orb, a feeling rises within
              you, as though a dark, ancient evil has suddenly turned its eye
              upon you.
            </p>
          ),
        },
        {
          prompt: 'Removing the Orb',
          text: (
            <p>
              As you pluck the orb from the statue's hand, around you you see
              two of the ashen shadows on the walls start to stir. Roll
              initiative. [First round] You hear murmurings coming from the
              shadows: "Begone from this place!"
            </p>
          ),
        },
      ],

      creatures: [
        {
          name: 'Shadow',
          quantity: {
            3: 3,
            4: 4,
            5: 5,
            6: 6,
          },
          statBlock: {
            url: 'https://www.dndbeyond.com/monsters/5428469-shadow-death-house',
            text: 'Shadow (Death House)',
          },
          trigger: 'Removing the orb',
          combatBehavior:
            'Once all shadows are awakened, they each attack a different target, until defeated or orb is returned',
        },
      ],

      checks: [
        {
          skills: ['Perception'],
          target: 'Walls',
          dc: 10,
          success:
            'On the eastern wall, uUnder a thin layer of clay, there is a concealed wooden door.',
        },
      ],

      items: [
        {
          name: 'Wooden statue',
          notes: [
            "Depicts Strahd (PCs don't know this)",
            'Standing next to wolf',
          ],
        },
        {
          name: 'Orb',
          value: '25 gp',
        },
        {
          name: 'Moldy skeletons',
          quantity: 7,
        },
      ],

      notes: [
        'Chanting is indiscernible',
        'Note number of shadows before reading description',
        'Shadows also murmur and moan, "Look not upon us" and "Return the Darklord\'s offering!"',
        'Two shadows awaken each round',
      ],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 4368,
            y1: 2870,
            x2: 4838,
            y2: 3665,
          },
        },
        {
          shape: 'circle',
          coords: {
            x: 4771,
            y: 3264,
            r: 253,
          },
        },
      ],
    },

    hiddenTrapdoor: {
      code: '32',
      name: 'Hidden Trapdoor',
      lighting: {
        day: 'Darkness',
        between: 'Darkness',
        night: 'Darkness',
      },

      descriptions: [
        {
          prompt: 'Ascent',
          text: (
            <p>
              The clay staircase ends at a cramped landing. Six feet above the
              ground, a half-rotted ceiling of close-fitting planks holds a
              closed wooden trapdoor leading to an upper floor. The trapdoor is
              bolted shut from this side.
            </p>
          ),
        },
      ],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 4528,
            y1: 2375,
            x2: 4682,
            y2: 2844,
          },
        },
      ],

      opportunities: [
        'Opening the trapdoor enables quick travel to and from den of wolves',
      ],

      notes: ['Chanting is indiscernible'],
    },

    leadersDen: {
      code: '33',
      name: "Cult Leaders' Den",
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
              This quiet room contains a wooden table flanked by two high-backed
              chairs and holding a clay jug and two flagons. Above the table is
              suspended an unlit cast-iron chandelier. Iron candlesticks stand
              in two corners of the chamber, their candles long since melted
              away. A short corridor at the north end of the room leads to a
              darkened chamber beyond.
            </p>
          ),
        },
      ],

      items: [
        {
          name: 'Wooden table',
          items: [
            {
              name: 'Clay jug',
            },
            {
              name: 'Flagons',
              quantity: 2,
            },
          ],
        },
        {
          name: 'Wooden chairs',
          quantity: 2,
        },
        {
          name: 'Iron candlesticks',
          quantity: 2,
          notes: ['Candles melted away'],
        },
        {
          name: 'Cast-iron chandelier',
        },
      ],

      notes: ['Chanting is indiscernible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3872,
            y1: 3359,
            x2: 4346,
            y2: 3833,
          },
        },
      ],
    },

    leadersQuarters: {
      code: '34',
      name: "Cult Leaders' Quarters",
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
                This room contains a large wood-framed bed, the feather mattress
                rotted by years of disuse. An old wooden wardrobe carved with
                demonic faces stands against the wall to the left, and a faded
                wooden footlocker stands quietly at the foot of the bed.
              </p>
              <p>
                The room is suffused with a familiar stench of death—but far
                stronger, mixing with a noxious scent that fills your lungs with
                every breath.
              </p>
            </>
          ),
        },
      ],

      creatures: [
        {
          name: 'Boneless',
          statBlock: {
            3: {
              text: 'Boneless (3P)',
            },
            4: {
              text: 'Boneless (4P)',
            },
            5: {
              url: 'https://www.dndbeyond.com/monsters/5353772-boneless',
              text: 'Boneless',
            },
            6: {
              text: 'Boneless (6P)',
            },
          },
          trigger: 'Footlocker is opened',
          combatBehavior: 'Attacks nearest creature until defeated',
        },
      ],

      items: [
        {
          name: 'Wooden footlocker',
          items: [
            {
              name: 'Cloak of protection',
            },
            {
              name: 'Potions of healing',
              quantity: 4,
              notes: ['Contained in a small wooden coffer'],
            },
            {
              name: 'Chain shirt',
            },
            {
              name: 'Mess kit',
            },
            {
              name: "Flask of alchemist's fire",
            },
            {
              name: 'Bullseye lantern',
            },
            {
              name: "Thieves' tools",
            },
            {
              name: 'Yellow leather-bound spellbook',
              notes: [
                'Contains the following wizard spells:',
                '1st level: Disguise Self, Mage Armor, Magic Missile, Protection from Evil and Good',
                '2nd level: Darkvision, Hold Person, Invisibility, Magic Weapon',
              ],
            },
          ],
        },
        {
          name: 'Wood-framed bed',
        },
        {
          name: 'Wooden wardrobe',
          notes: ['Carved with demonic faces'],
          items: [
            {
              name: 'Old robes',
              quantity: 4,
            },
            {
              name: 'Rotted organs',
              quantity: 2,
              notes: [
                'Contained beneath the hems the robes',
                'One half-eaten liver, one gnawed intestine',
              ],
            },
            {
              name: 'Iron candlesticks',
              quantity: 2,
            },
            {
              name: 'Torches',
              quantity: 30,
              notes: ['Contained in an open crate'],
            },
            {
              name: 'Candles',
              quantity: 15,
              notes: ['Contained in a leather sack in an open crate'],
            },
          ],
        },
      ],

      notes: ['Chanting is indiscernible', 'Ignore cavities, per Reloaded'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3227,
            y1: 3524,
            x2: 3686,
            y2: 3993,
          },
        },
      ],
    },

    reliquary: {
      code: '35',
      name: 'Reliquary',
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
                The dusty stone steps descend past a landing and around a bend
                until they end at a cold, rectangular chamber. A thin, wafting
                mist clings to the ground, and the wooden cross beams that
                support the ceiling groan beneath the weight of the house and
                underground complex above.
              </p>
              <p>
                The walls of this room are cut with small, chiseled alcoves,
                each holding a strange, ghastly trinket or relic. A corridor
                with a sagging ceiling exits the chamber and bends out of sight
                to the right. Past it, you can see a stone slope that descends
                into black, murky water. The ghostly chant you've heard since
                entering the basement is strongest here, and seems to be
                emanating from the other side of a rusted, closed portcullis.
              </p>
              <p>You can finally understand the words.</p>
              <p>They say, over and over again, in a ceaseless refrain:</p>
              <p>"He is the Ancient."</p>
              <p>"He is the Land."</p>
            </>
          ),
        },
      ],

      checks: [
        {
          skills: ['Medicine', 'Nature'],
          target: 'Yellow hand',
          dc: 10,
          success: "The hand is a goblin's hand",
        },
        {
          skills: ['Medicine', 'Nature'],
          target: 'Bone knife',
          dc: 15,
          success: 'The knife is made from human bone',
        },
        {
          skills: ['Arcana'],
          target: 'Orb',
          dc: 17,
          success: 'The eye is from a nothic',
        },
        {
          skills: ['Medicine', 'Nature'],
          target: 'Aspergillum',
          dc: 15,
          success: 'The aspergillum is made of deer bone',
        },
        {
          skills: ['Survival'],
          target: 'Aspergillum',
          dc: 20,
          success: 'The aspergillum is made of deer bone',
        },
        {
          skills: ['Medicine', 'Arcana'],
          target: 'Cloak',
          dc: 15,
          success: 'The cloak is made of stitched ghoul skin',
        },
        {
          skills: ['Nature'],
          target: 'Bag',
          dc: 5,
          success: 'The bag is full of bat guano',
        },
        {
          skills: ['Medicine', 'Arcana'],
          target: 'Finger',
          dc: 15,
          success: 'The finger was severed from a hag',
        },
        {
          skills: ['Medicine', 'Nature'],
          target: 'Tongue',
          dc: 15,
          success: 'The tongue is from a dire wolf',
        },
        {
          skills: ['Arcana', 'Investigation'],
          target: 'Any relic',
          dc: 12,
          success: 'The apparent relic is worthless trash',
          notes: [
            'If they fail Arcana on the frog stick, but beat a DC 7, they think it could be a wand of polymorph',
          ],
        },
      ],

      items: [
        {
          name: 'Yellow hand',
          notes: [
            "A small, mummified, yellow hand with sharp claws (a goblin's hand) on a loop of rope",
          ],
        },
        {
          name: 'Bone knife',
          notes: ['A knife carved from a human bone'],
        },
        {
          name: 'Dagger',
          notes: ["A dagger with a rat's skull set into the pommel"],
        },
        {
          name: 'Orb',
          notes: ["An 8-inch-diameter varnished orb made from a nothic's eye"],
        },
        {
          name: 'Aspergillum',
          notes: [
            'An aspergillum carved from bone',
            'Used to sprinkle holy water',
          ],
        },
        {
          name: 'Cloak',
          notes: ['A folded cloak made of stitched ghoul skin'],
        },
        {
          name: 'Frog stick',
          notes: [
            'A desiccated frog lashed to a stick',
            'Looks like a wand of polymorph',
          ],
        },
        {
          name: 'Bag',
          notes: ['A bag full of bat guano'],
        },
        {
          name: 'Severed finger',
          notes: ["A hag's severed finger"],
        },
        {
          name: 'Wooden figurine',
          notes: [
            'A 6-inch-tall wooden figurine of a mummy, its arms crossed over its chest',
          ],
        },
        {
          name: 'Pendant',
          notes: ["An iron pendant adorned with a devil's face"],
        },
        {
          name: 'Shrunken head',
          notes: ['The shrunken, shriveled head of a halfling'],
        },
        {
          name: 'Tongue',
          notes: [
            "A small wooden coffer containing a severed dire wolf's withered tongue",
          ],
        },
      ],

      notes: ['Chanting is fully audible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3552,
            y1: 4337,
            x2: 4346,
            y2: 4815,
          },
        },
      ],
    },

    prison: {
      code: '36',
      name: 'Prison',
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
              The sound of clinking chains melds with a quiet,
              near-imperceptible rustling as you round the bend into a long,
              darkened dungeon. Rusted shackles hang patiently from the walls,
              as if waiting to bite into prisoners' flesh once more.
            </p>
          ),
        },
      ],

      checks: [
        {
          skills: ['Perception'],
          target: 'Walls',
          dc: 15,
          success: 'A secret door is hidden on the southern wall',
        },
      ],

      items: [
        {
          name: 'Shackles',
          quantity: 12,
          notes: ['Rusty shackles hanging from walls'],
        },
        {
          name: 'Human skeleton',
          notes: ['Marked by X on map', 'Wearing a tattered black robe'],
          items: [
            {
              name: 'Gold ring',
              value: '25 gp',
            },
          ],
        },
      ],

      notes: ['Chanting is fully audible'],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3227,
            y1: 5159,
            x2: 3686,
            y2: 6302,
          },
        },
      ],
    },

    portcullis: {
      code: '37',
      name: 'Portcullis',
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
              The floor is submerged beneath two feet of dark, murky water that
              sloshes around your calves and boots. The tunnel forward is
              blocked by a rusty iron portcullis. Beyond its iron bars, you can
              make out the dark outline of a half-submerged chamber, a raised
              stone dais, and a thick cloud of rolling mist.
            </p>
          ),
        },
      ],

      checks: [
        {
          skills: ['Athletics'],
          target: 'Portcullis',
          dc: 20,
          success: 'The portcullis is lifted',
        },

        {
          skills: ['Investigation'],
          target: 'Portcullis',
          dc: 12,
          success:
            'The portcullis is rigged to a chain-link mechanism that is operated by a wheel on the other side. The mechanism is broken.',
        },
      ],

      items: [
        {
          name: 'Portcullis',
        },
        {
          name: 'Wooden wheel',
          notes: ['Chain-link mechanism has broken'],
        },
      ],

      notes: [
        'Chanting is fully audible',
        'Part of the floor under 2 feet of water (difficult terrain)',
      ],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 4040,
            y1: 4844,
            x2: 4178,
            y2: 5158,
          },
        },
      ],
    },

    ritualChamber: {
      code: '38',
      name: 'Ritual Chamber',
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
                The smooth masonry walls of this forty-foot-square room provide
                excellent acoustics. Featureless stone pillars support the
                ceiling, and murky water covers most of the floor. Stairs lead
                up to dry stone ledges that hug the walls. In the middle of the
                room, more stairs rise to form an octagonal dais that also rises
                above the water. Rusty chains with shackles dangle from the
                ceiling directly above a stone altar mounted on the dais. The
                altar is carved with hideous depictions of grasping ghouls and
                is stained with dry blood. A small, white bundle lies atop it,
                surrounded by pulsating, fleshy tendrils.
              </p>
              <p>
                The tendrils run to a breach in the far wall that leads to a
                dark cave, their fleshy masses connecting to a dark, hulking
                shadow that lies within, its bloated mass rising and falling
                with a slow, shuddering rhythm.
              </p>
              <p>
                As soon as you step foot into the chamber, the ghostly chanting
                you've heard suddenly falls silent.
              </p>
            </>
          ),
        },
      ],

      creatures: [
        {
          name: 'Walter Phase 1',
          statBlock: {
            3: {
              text: 'The Flesh Mound (3P)',
            },
            4: {
              text: 'The Flesh Mound (4P)',
            },
            5: {
              url: 'https://www.dndbeyond.com/monsters/5353772-flesh-mound',
              text: 'The Flesh Mound',
            },
            6: {
              text: 'The Flesh Mound (6P)',
            },
          },
          trigger: 'Entry',
          combatBehavior: 'When attacked, attacks chaotically until defeated',
        },
        {
          name: 'Walter Phase 2',
          statBlock: {
            3: {
              text: 'Walter, the Graveborn (3P)',
            },
            4: {
              text: 'Walter, the Graveborn (4P)',
            },
            5: {
              url: 'https://www.dndbeyond.com/monsters/5353772-flesh-mound',
              text: 'Walter, the Graveborn',
            },
            6: {
              text: 'Walter, the Graveborn (6P)',
            },
          },
          trigger: 'Walter Phase 1 defeated',
          combatBehavior: 'Attacks chaotically until defeated',
        },
      ],

      checks: [
        {
          skills: ['Intimidation'],
          target: 'Amber shard (see opportunities)',
          dc: 13,
          success: `The flesh mound must immediately use its Reaction, if
            available, to follow the command, moving up to its Speed to do so
            if necessary. The mound won't obey a command that is directly
            harmful to it, and can stop following a command at the start of its
            next turn.`,
        },
      ],

      items: [
        {
          name: 'Stone altar',
          notes: ['The words "FEED HIM" are carved into the stone surface'],
          items: [
            {
              name: 'White bundle',
              notes: [
                'Shaped like a swaddled baby',
                'Contains a rusted, serrated dagger stained with ancient blood',
              ],
            },
          ],
        },
        {
          name: 'Rusty chains',
          notes: ['Hanging from ceiling above altar'],
        },
        {
          name: 'Wooden wheel',
          notes: [
            'Raises and lowers portcullis',
            'Chain-link mechanism has broken',
          ],
        },
      ],

      opportunities: [
        `A player in possession of Elisabeth's amber shard from the Master Suite
        can present the shard as a bonus action while within 30 feet of the
        flesh mound, speak the name "Walter," and give a brief command. If the
        player succeeds on a DC 13 Charisma (Intimidation) check, the mound must
        immediately use a reaction, if available, to follow the command, moving
        up to its speed to do so if necessary. The mound won't obey a command
        that is directly harmful to it, and can stop following a command at the
        start of its next turn.`,
      ],

      notes: [
        'Chanting is silent',
        'Areas with water are 2 feet deep and difficult terrain',
      ],

      areas: [
        {
          shape: 'rect',
          coords: {
            x1: 3700,
            y1: 5159,
            x2: 5021,
            y2: 6483,
          },
        },
        {
          shape: 'circle',
          coords: {
            x: 4197,
            y: 6621,
            r: 184,
          },
        },
      ],
    },
  },
};

export default deathHouseData;
