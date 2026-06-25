import type { CurrencyUnit, Skill } from '#prisma-enums';

export type SkillDto =
	| Exclude<Skill, 'AnimalHandling' | 'SleightOfHand'>
	| 'Animal Handling'
	| 'Sleight Of Hand';

export type Lighting = 'Darkness' | 'Dim Light' | 'Bright Light';
export type RelativeLighting = Lighting | 'Default' | 'Default+' | 'Default-';

export type Value = `${number} ${CurrencyUnit}`;
