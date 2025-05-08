import type { Region } from './MapData.ts';

const dungeonLevel2Regions: {
  [key: string]: Region;
} = {
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
              mist clings to the ground, and the wooden cross beams that support
              the ceiling groan beneath the weight of the house and underground
              complex above.
            </p>
            <p>
              The walls of this room are cut with small, chiseled alcoves, each
              holding a strange, ghastly trinket or relic. A corridor with a
              sagging ceiling exits the chamber and bends out of sight to the
              right. Past it, you can see a stone slope that descends into
              black, murky water. The ghostly chant you've heard since entering
              the basement is strongest here, and seems to be emanating from the
              other side of a rusted, closed portcullis.
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
            The sound of clinking chains melds with a quiet, near-imperceptible
            rustling as you round the bend into a long, darkened dungeon. Rusted
            shackles hang patiently from the walls, as if waiting to bite into
            prisoners' flesh once more.
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
            sloshes around your calves and boots. The tunnel forward is blocked
            by a rusty iron portcullis. Beyond its iron bars, you can make out
            the dark outline of a half-submerged chamber, a raised stone dais,
            and a thick cloud of rolling mist.
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
              ceiling, and murky water covers most of the floor. Stairs lead up
              to dry stone ledges that hug the walls. In the middle of the room,
              more stairs rise to form an octagonal dais that also rises above
              the water. Rusty chains with shackles dangle from the ceiling
              directly above a stone altar mounted on the dais. The altar is
              carved with hideous depictions of grasping ghouls and is stained
              with dry blood. A small, white bundle lies atop it, surrounded by
              pulsating, fleshy tendrils.
            </p>
            <p>
              The tendrils run to a breach in the far wall that leads to a dark
              cave, their fleshy masses connecting to a dark, hulking shadow
              that lies within, its bloated mass rising and falling with a slow,
              shuddering rhythm.
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
};

export default dungeonLevel2Regions;
