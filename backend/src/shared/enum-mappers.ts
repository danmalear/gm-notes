import type { AbsoluteLighting, RelativeLighting, Skill } from '#prisma-enums';
import type {
	AbsoluteLightingDto,
	RelativeLightingDto,
	SkillDto,
} from './data-types.ts';

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

export function mapAbsoluteLightingToDto(
	lighting: AbsoluteLighting,
): AbsoluteLightingDto {
	switch (lighting) {
		case 'BrightLight':
			return 'Bright Light';
		case 'DimLight':
			return 'Dim Light';
		default:
			return lighting;
	}
}

export function mapAbsoluteLightingToModel(
	lighting: AbsoluteLightingDto,
): AbsoluteLighting {
	switch (lighting) {
		case 'Bright Light':
			return 'BrightLight';
		case 'Dim Light':
			return 'DimLight';
		default:
			return lighting;
	}
}

export function mapRelativeLightingToDto(
	lighting: RelativeLighting,
): RelativeLightingDto {
	switch (lighting) {
		case 'BrightLight':
			return 'Bright Light';
		case 'DimLight':
			return 'Dim Light';
		case 'DefaultPlus':
			return 'Default+';
		case 'DefaultMinus':
			return 'Default-';
		default:
			return lighting;
	}
}
