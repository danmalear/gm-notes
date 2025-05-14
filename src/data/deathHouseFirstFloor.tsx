import type { Region } from './MapData.ts';

const firstFloorRegions: {
	[key: string]: Region;
} = {
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
							wrought-iron gate fills this arch, its rusty hinges creaking as it
							sways in the wind.
						</p>
						<p>
							On either side of the gate, oil lamps hang from chains, their
							light dim and flickering, casting a sickly glow that barely
							pierces the surrounding fog.
						</p>
						<p>
							Beyond the gate, a set of sturdy oaken doors stand closed, framed
							by the gate and the lamps. The doors are old and weathered, their
							wood darkened by time, but they stand strong and proud—an
							unwelcome entrance to the house beyond.
						</p>
						<p>
							A gust of wind sweeps past you, carrying with it a whisper of cold
							dread that sends shivers down your spine.
						</p>
					</>
				),
			},
			{
				prompt: 'Re-entry (first time outside)',
				text: (
					<p>
						Going back outside, the first thing that hits you is a rank smell,
						like old meat. Its source is obvious: fully surrounding the exterior
						of the house, you see enormous, fleshy tendrils, extruding from
						beneath the manor and tightly packed together, forming a solid wall.
					</p>
				),
			},
		],

		items: [
			{
				name: 'Oil lamps',
				quantity: 2,
				notes: ['Hanging from ceiling'],
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
							extinguish. The pitter-patter of rain outside ceases, leaving the
							house in a deathly silence. On the right, above a marble staircase
							spiralling up to the upper levels, unnaturally illuminated letters
							appear in blood, one by one, spelling out a poem: [HANDOUT: Poem]
						</p>
						<p>
							A grandfather clock in the center of the stairwell tolls six
							times. Glancing around, you see that the walls comprise
							intricately carved wooden panels. Above the recently extinguished
							fireplace, a family portrait hangs, with a descriptive plaque
							underneath. You also see several doors leading out from the hall
							in addition to the one behind you.
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
				text: 'Durst family portrait',
				url: 'https://publish-01.obsidian.md/access/7db64b11c71d88572ddc6cd06b888976/images/The%20Durst%20Family.png',
			},
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
					x2: 1136,
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
			{
				shape: 'circle',
				coords: {
					x: 1136,
					y: 6067,
					r: 241,
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
						sitting on an upper shelf. An envelope protrudes from the pocket of
						one of the cloaks.
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
				url: 'https://publish-01.obsidian.md/access/7db64b11c71d88572ddc6cd06b888976/images/Durst%20Invitation.jpg',
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
							fireplace is a stag's head, and positioned around the outskirts of
							the room are two additional stuffed wolves—a large gray wolf and a
							smaller brown wolf.
						</p>
						<p>
							Two padded chairs draped in animal furs face the hearth, with an
							oak table between them supporting an assortment of objects. A
							chandelier hangs above a cloth-covered table surrounded by four
							chairs, and two cabinets stand against the walls. A pair of small
							toys seems to have been forgotten beneath one of the chairs.
						</p>
					</>
				),
			},
			{
				prompt: 'Looking back at wolves',
				text: (
					<p>
						When you turn back around, you see that the wolves are no longer in
						the same positions they were before. The larger wolf and the smaller
						brown wolf now stand beside each other, while the smaller gray wolf
						has turned its snarl toward the other two.
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
				success: 'The large, gray wolf is a male, the smaller ones are female.',
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

	kitchen: {
		code: '4A',
		name: 'Kitchen',
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
							You enter a tidy kitchen, with dishware, cookware, and utensils
							neatly placed on shelves. A worktable has a cutting board and
							rolling pin atop it. A stone, dome-shaped oven stands near the
							east wall, its bent iron stovepipe connecting to a hole in the
							ceiling. Behind the stove and to the left is a thin door.
						</p>
						<p>
							In the front right-hand corner of the room stands a small wooden
							door set into the wall.
						</p>
					</>
				),
			},
		],

		notes: ['Largest kitchen knife is missing'],

		areas: [
			{
				shape: 'rect',
				coords: {
					x1: 1073,
					y1: 5331,
					x2: 1392,
					y2: 5816,
				},
			},
			{
				shape: 'rect',
				coords: {
					x1: 1315,
					y1: 5816,
					x2: 1392,
					y2: 5886,
				},
			},
		],
	},

	pantry: {
		code: '4B',
		name: 'Pantry',
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
						Inside the pantry you find various typical dry goods, as well as on
						one shelf, a set of decorative plates, each mounted upright and
						painted with pictures of windmills. One of the plates has been
						knocked off the shelf, leaving shattered remnants on the ground, and
						a gap between its neighboring plates.
					</p>
				),
			},
		],

		checks: [
			{
				skills: ['Nature'],
				target: 'Vial of brown powder',
				dc: 14,
				success: 'The powder is dried silphium, a contraceptive herb.',
			},
		],

		items: [
			{
				name: 'Copper pot',
				notes: ['Behind the empty spot on the shelf'],
				items: [
					{
						name: 'Bottle of wine',
						notes: [
							'Wizards of Wine: Champagne du le Stomp',
							'If a PC drinks it, they realize it has turned to vinegar',
						],
					},
					{
						name: 'Folded lace',
						notes: ['Initial "K" sewn in one corner'],
					},
					{
						name: 'Vial of brown powder',
						notes: [
							'(see checks) Contains dried silphium, a contraceptive herb',
						],
					},
					{
						name: 'Bouquet of wilted sunflowers',
					},
					{
						name: 'Small scroll of parchment',
						notes: [
							'"For the light of my life. - G."',
							'Tied to the bouquet',
							'If someone reads it, a kitchen knife flies into the opposite wall',
						],
					},
				],
			},
			{
				name: 'Decorative plates',
				quantity: 6,
				notes: ['Each painted with a windmill'],
			},
			{
				name: 'Shattered plate',
				notes: ['Remnants on the ground'],
			},
		],

		handouts: [
			{
				text: 'Bouquet scroll',
				url: 'https://www.strahdreloaded.com/Act+I+-+Into+the+Mists/Arc+A+-+Escape+From+Death+House#Kitchen+and+Pantry',
			},
		],

		notes: ['Food is extremely bland, but not dangerous'],

		areas: [
			{
				shape: 'rect',
				coords: {
					x1: 1073,
					y1: 5176,
					x2: 1392,
					y2: 5320,
				},
			},
		],
	},

	diningRoom: {
		code: '5',
		name: 'Dining Room',
		lighting: {
			day: 'Dim light',
			between: 'Darkness',
			night: 'Darkness',
		},

		descriptions: [
			{
				prompt: 'Approach',
				text: (
					<p>
						As you approach the door, you can hear the muffled sounds of a
						lively dinner coming from within--laughter and chatter punctuated by
						the clinking of silverware and crystalware.
					</p>
				),
			},
			{
				prompt: 'Entry',
				text: (
					<>
						<p>
							You enter into a wood-paneled dining room. The centerpiece is a
							carved mahogany table surrounded by eight high-backed chairs with
							sculpted armrests and cushioned seats. A crystal chandelier hangs
							above the table, which is set with resplendent silverware and
							crystal glasses polished to a dazzling shine. Mounted above the
							marble fireplace is a mahogany-framed painting of an alpine vale.
						</p>
						<p>
							The wall paneling is carved with elegant images of deer among the
							trees. Red silk drapes cover the windows, and a tapestry hangs
							from an iron rod bolted to the south wall.
						</p>
						<p>
							The table groans beneath the weight of a delicious-looking feast.
							Exquisite dishes lay on grand platters: succulent roasted poultry
							glazed with a shimmering honey sauce, perfectly grilled cuts of
							beef still steaming lightly, a variety of cheeses and fresh
							fruits, and freshly baked breads giving off a comforting aroma.
						</p>
					</>
				),
			},
		],

		checks: [
			{
				skills: ['Perception'],
				target: 'Walls',
				dc: 12,
				success:
					'On the wood paneling, twisted faces are carved into the tree trunks, and wolves lurk amid the foliage.',
			},
		],

		items: [
			{
				name: 'Tapestry',
				notes: [
					'Depicts hunting dogs and horse-mounted aristocrats chasing a wolf',
					'Rots if it leaves the house',
				],
			},
			{
				name: 'Painting',
				notes: ['Depicts an alpine vale', 'Fades if it leaves the house'],
			},
			{
				name: 'Dining table',
				items: [
					{
						name: 'Silverware',
						notes: ['Tarnishes if it leaves the house'],
					},
					{
						name: 'Crystalware',
						notes: ['Cracks if it leaves the house'],
					},
				],
			},
			{
				name: 'Dining chairs',
				quantity: 8,
			},
			{
				name: 'Crystal chandelier',
				notes: ['Hanging above the table'],
			},
		],

		areas: [
			{
				shape: 'rect',
				coords: {
					x1: 413,
					y1: 5176,
					x2: 1060,
					y2: 5650,
				},
			},
			{
				shape: 'rect',
				coords: {
					x1: 584,
					y1: 5650,
					x2: 737,
					y2: 5816,
				},
			},
		],
	},
};

export default firstFloorRegions;
