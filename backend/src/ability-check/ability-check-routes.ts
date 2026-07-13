import type { ICommandBus } from '#command/command-bus.ts';
import type { IEventBus } from '#event/event-bus.ts';
import { getById } from '#shared/route-utils.ts';
import type { Express } from 'express';
import { toDto } from './ability-check-mappers.ts';
import type { IAbilityCheckRepository } from './ability-check-repository.ts';

export interface AbilityCheckRouteOpts {
	app: Express;
	commandBus: ICommandBus;
	eventBus: IEventBus;
	abilityCheckRepository: IAbilityCheckRepository;
}

export function abilityCheckRoutes({
	app,
	abilityCheckRepository,
}: AbilityCheckRouteOpts) {
	const apiNamespace = 'ability-checks';

	getById(app, {
		apiNamespace,
		objectDescriptor: 'Ability Check',
		repository: abilityCheckRepository,
		toDto,
	});
}
