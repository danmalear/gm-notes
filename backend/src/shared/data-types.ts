import type {
	AbsoluteLighting,
	CurrencyUnit,
	RelativeLighting,
	Skill,
} from '#prisma-enums';

export type SkillDto =
	| Exclude<Skill, 'AnimalHandling' | 'SleightOfHand'>
	| 'Animal Handling'
	| 'Sleight of Hand';

export type AbsoluteLightingDto =
	| Exclude<AbsoluteLighting, 'BrightLight' | 'DimLight'>
	| 'Bright Light'
	| 'Dim Light';

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
