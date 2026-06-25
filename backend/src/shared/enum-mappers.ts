import type { Skill } from '#prisma-enums';
import type { SkillDto } from './data-types.ts';

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
