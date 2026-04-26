import type { CommandBus } from '#command/CommandBus.ts';
import type { EventBus } from '#event/EventBus.ts';
import { getById } from '#shared/route-utils.ts';
import type { Express } from 'express';
import { toDto } from './ability-check-mappers.ts';
import type { AbilityCheckRepository } from './ability-check-repository.ts';

export function abilityCheckRoutes(
	app: Express,
	_commandBus: CommandBus, // @TODO
	_eventBus: EventBus, // @TODO
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
