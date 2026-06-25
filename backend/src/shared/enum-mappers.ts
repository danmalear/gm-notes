import type { RelativeLighting, Skill } from '#prisma-enums';
import type { RelativeLightingDto, SkillDto } from './data-types.ts';

export function mapSkillToDto(skill: Skill): SkillDto {
	switch (skill) {
		case 'AnimalHandling':
			return 'Animal Handling';
		case 'SleightOfHand':
			return 'Sleight Of Hand';
		default:
			return skill;
	}
}

export function mapRelativeLightingToDto(
	skill: RelativeLighting,
): RelativeLightingDto {
	switch (skill) {
		case 'BrightLight':
			return 'Bright Light';
		case 'DimLight':
			return 'Dim Light';
		case 'DefaultPlus':
			return 'Default+';
		case 'DefaultMinus':
			return 'Default-';
		default:
			return skill;
	}
}
