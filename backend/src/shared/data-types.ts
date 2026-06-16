export type Lighting = 'Darkness' | 'Dim Light' | 'Bright Light';
export type RelativeLighting = Lighting | 'Default' | 'Default+' | 'Default-';

export type CurrencyUnit = 'CP' | 'SP' | 'EP' | 'GP' | 'PP';
export type Value = `${number} ${CurrencyUnit}`;

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
