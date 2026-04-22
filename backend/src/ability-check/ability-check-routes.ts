import type { CommandRouter } from '#command/CommandRouter.ts';
import { getById } from '#shared/route-utils.ts';
import type { Express } from 'express';
import type { AbilityCheckRepository } from './AbilityCheckRepository.ts';
import { toDto } from './ability-check-mappers.ts';

export function abilityCheckRoutes(
	app: Express,
	_commandRouter: CommandRouter, // @TODO
	abilityCheckRepository: AbilityCheckRepository,
) {
	const apiNamespace = 'ability-checks';

	getById(app, {
		apiNamespace,
		objectDescriptor: 'Ability Check',
		repository: abilityCheckRepository,
		toDto,
	});
}
