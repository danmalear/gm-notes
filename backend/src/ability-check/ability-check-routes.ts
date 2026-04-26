import type { MessageBus } from '#message/MessageBus.ts';
import { getById } from '#shared/route-utils.ts';
import type { Express } from 'express';
import { toDto } from './ability-check-mappers.ts';
import type { AbilityCheckRepository } from './ability-check-repository.ts';

export function abilityCheckRoutes(
	app: Express,
	_messageBus: MessageBus, // @TODO
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
