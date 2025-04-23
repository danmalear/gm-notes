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

export interface Coords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Area {
  shape: string;
  coords: Coords;
}

export interface Description {
  prompt: string;
  text: JSX.Element;
}

export type Lighting = {
  [key in TimeOfDay]: LightLevel;
};

export interface Creature {
  name: string;
  trigger?: string;
  pronouns?: string;
  quantity: number;
  statBlockText?: string;
  statBlockUrl: string;
  personality?: string;
  motivation?: string;
  combatBehavior?: string;
  roles?: string[];
}

export interface AbilityCheck {
  skills: Skill[];
  target: string;
  dc: number;
  success?: string;
  failure?: string;
}

export interface Item {
  name: string;
  quantity?: number;
  notes: string;
}

export interface ItemGroup {
  name: string;
  description?: string;
  items: Item[];
}

export interface Handout {
  text: string;
  url: string;
}

export interface Region {
  code?: string;
  name: string;
  areas: Area[];
  descriptions: Description[];
  lighting?: Lighting;
  creatures?: Creature[];
  checks?: AbilityCheck[];
  items?: ItemGroup[];
  handouts?: Handout[];
  opportunities?: string[];
  notes?: string[];
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
