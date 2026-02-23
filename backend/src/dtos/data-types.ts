export type Lighting = 'Darkness' | 'Dim Light' | 'Bright Light';
// @TODO this will be used in regions to change based on map lighting
export type RelativeLighting = Lighting | 'Default' | 'Default+' | 'Default-';

export type CurrencyUnit = 'CP' | 'SP' | 'EP' | 'GP' | 'PP';
export type Value = `${number} ${CurrencyUnit}`;

export type ActionType =
	| 'Attack'
	| 'Dash'
	| 'Disengage'
	| 'Dodge'
	| 'Help'
	| 'Hide'
	| 'Influence'
	| 'Magic'
	| 'Ready'
	| 'Search'
	| 'Study'
	| 'Utilize';

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
