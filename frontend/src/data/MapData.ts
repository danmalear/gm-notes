import { JSX } from 'react';

export type TimeOfDay = 'day' | 'night' | 'between';
export type LightLevel = 'Darkness' | 'Dim light' | 'Bright light';
export type Skill =
	| 'Acrobatics'
	| 'Animal Handling'
	| 'Arcana'
	| 'Athletics'
	| 'Deception'
	| 'History'
	| 'Insight'
	| 'Intimidation'
	| 'Investigation'
	| 'Medicine'
	| 'Nature'
	| 'Perception'
	| 'Performance'
	| 'Persuasion'
	| 'Religion'
	| 'Sleight of Hand'
	| 'Stealth'
	| 'Survival';
export type Value = `${number} ${'gp' | 'sp' | 'cp' | 'ep' | 'pp'}`;
export type ValidPartySize = 3 | 4 | 5 | 6;

export interface RectCoords {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export interface CircleCoords {
	x: number;
	y: number;
	r: number;
}

export interface RectArea {
	shape: 'rect';
	coords: RectCoords;
}

export interface CircleArea {
	shape: 'circle';
	coords: CircleCoords;
}

export type Area = RectArea | CircleArea;

export interface Description {
	prompt: string;
	text: JSX.Element;
}

export type Lighting = {
	[key in TimeOfDay]: LightLevel;
};

export interface StatBlock {
	text: string;
	url?: string;
}

export type ScaledStatBlock = {
	[key in ValidPartySize]: StatBlock;
};

export type ScaledQuantity = {
	[key in ValidPartySize]: number;
};

export interface Creature {
	name: string;
	trigger?: string;
	pronouns?: string;
	quantity?: number | ScaledQuantity;
	statBlock: StatBlock | ScaledStatBlock;
	personality?: string;
	motivation?: string;
	combatBehavior?: string;
	roles?: string[];
}

export interface AbilityCheck {
	skills: Skill[];
	target: string;
	dc: number;
	prerequisites?: string[];
	success?: string;
	failure?: string;
	notes?: string[];
}

export interface Item {
	name: string;
	quantity?: number;
	value?: Value;
	items?: Item[];
	notes?: string[];
}

export interface Handout {
	text: string;
	url?: string;
}

export interface Region {
	code?: string;
	name: string;
	lighting?: Lighting;
	descriptions: Description[];
	creatures?: Creature[];
	checks?: AbilityCheck[];
	items?: Item[];
	opportunities?: string[];
	handouts?: Handout[];
	notes?: string[];
	areas: Area[];
}

export interface MapImage {
	src: string;
	sizeX: number;
	sizeY: number;
}

export interface Map {
	image: MapImage;
	regions: {
		[key: string]: Region;
	};
}
