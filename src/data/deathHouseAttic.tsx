import type { Region } from './MapData.ts';

const atticRegions: {
	[key: string]: Region;
} = {
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

		checks: [
			{
				skills: ['Sleight of Hand'],
				target: "Children's room door",
				dc: 15,
				success: 'Door is unlocked',
				notes: ["Thieves' tools proficiency grants advantage"],
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

		checks: [
			{
				skills: ['Investigation'],
				target: 'Recruitment list',
				dc: 12,
				success: 'You spot the name Drasha among the listed names',
				prerequisites: ['Have found notes referring to Drasha'],
			},
		],

		items: [
			{
				name: 'Music box',
				items: [
					{
						name: 'Key',
						notes: ["Opens padlock on children's room door"],
					},
					{
						name: 'Floor plan',
						notes: ['See handouts'],
					},
					{
						name: 'Recruitment list',
						notes: ['Contains a bunch of unfamiliar names'],
					},
					{
						name: 'Skinning knife',
						notes: ['Rusted and bloodstained'],
					},
				],
			},
			{
				name: 'Doll',
				notes: ['Same doll that Thorn was holding in the portrait'],
			},
			{
				name: 'Wardrobe',
			},
			{
				name: 'Nightstand',
			},
			{
				name: 'Iron stove',
			},
			{
				name: 'Bed',
			},
			{
				name: 'Rocking chair',
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

		checks: [
			{
				skills: ['Medicine'],
				target: 'Remains',
				dc: 14,
				success:
					"Though the woman's body bears many physical lacerations, you determine that she actually died of starvation",
			},
			{
				skills: ['Perception'],
				target: 'Walls',
				dc: 15,
				success:
					'On the west wall, you find that a secret door has been carved out',
				prerequisites: ["Found Strahd's letter"],
				notes: [
					'If this secret door was revealed by the dollhouse, it is revealed in person without a check',
				],
			},
		],

		items: [
			{
				name: 'Trunk',
				notes: ['Covered by sheet'],
				items: [
					{
						name: 'Remains',
						notes: [
							"Similar wounds to those on the spirit in the mirror in the nursemaid's suite",
						],
					},
				],
			},
			{
				name: 'Mirror',
				notes: ['Covered by sheet'],
			},
			{
				name: 'Miscellany',
				notes: [
					'Sculptures, generic paintings, crates full of knickknacks',
					'Covered by sheets',
				],
			},
			{
				name: 'Iron stove',
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

		items: [
			{
				name: 'Wardrobe',
			},
			{
				name: 'Nightstand',
			},
			{
				name: 'Rocking chair',
			},
			{
				name: 'Bed',
			},
			{
				name: 'Iron stove',
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

		creatures: [
			{
				name: 'Rosavalda Durst',
				trigger: 'Someone examines the dollhouse or toy chest',
				pronouns: 'she/her',
				statBlock: {
					text: 'Rose Durst',
				},
				personality:
					'Defiant, curious, apprehensive, fiercely protective of Thorn',
				motivation: 'Keep Thorn safe, bring their souls to peace',
				combatBehavior:
					'Tries desperately to create peace, but flees with Thorn if pressed',
			},
			{
				name: 'Thornboldt Durst',
				trigger: 'Someone examines the dollhouse or toy chest',
				pronouns: 'he/him',
				statBlock: {
					text: 'Thorn Durst',
				},
				personality: 'Joyous, anxious, fearful, observant and insightful',
				motivation: 'Keep close to Rose, and play with fun toys',
				combatBehavior: 'Cowers and cries, depends on Rose to protect him',
			},
		],

		checks: [
			{
				skills: ['Religion'],
				target: 'Rose/Thorn',
				dc: 15,
				success:
					'Their specific nature is that of a ghost - an undead phantom that died with some unfinished business or extreme emotion',
			},
		],

		items: [
			{
				name: 'Dollhouse',
				notes: [
					"Exact reconstruction of the current house, with figures portraying everyone's current position",
					'Shows secret rooms',
				],
			},
			{
				name: "Rose's diary",
				notes: ['Contains the mending, light, and shocking grasp cantrips'],
			},
			{
				name: 'Toy chest',
			},
			{
				name: 'Skeletons',
				quantity: 2,
			},
			{
				name: 'Beds',
				quantity: 2,
			},
		],

		opportunities: [
			'Any secret door revealed by dollhouse (see checks) has Advantage to be found in person.',
			'Rose can be convinced to show the party the entrance to the basement in the dollhouse, which is conjured and will be automatically revealed when next sought in person.',
			'Upon exit, Rose and Thorn offer to join the party by possessing them. Anyone Rose possesses gets the cantrips in her diary, and anyone Thorn possesses gets the mage hand cantrip, with the spectral hand being invisible.',
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
