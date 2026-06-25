import type { CurrencyUnit, RelativeLighting, Skill } from '#prisma-enums';

export type SkillDto =
	| Exclude<Skill, 'AnimalHandling' | 'SleightOfHand'>
	| 'Animal Handling'
	| 'Sleight Of Hand';

export type Lighting = 'Darkness' | 'Dim Light' | 'Bright Light';

export type RelativeLightingDto =
	| Exclude<
			RelativeLighting,
			'BrightLight' | 'DimLight' | 'DefaultPlus' | 'DefaultMinus'
	  >
	| 'Bright Light'
	| 'Dim Light'
	| 'Default+'
	| 'Default-';

export type Value = `${number} ${CurrencyUnit}`;
