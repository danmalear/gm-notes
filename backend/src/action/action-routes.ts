import type { ICommandBus } from '#command/command-bus.ts';
import type { IEventBus } from '#event/event-bus.ts';
import { getById } from '#shared/route-utils.ts';
import type { Express } from 'express';
import { toDto } from './action-mappers.ts';
import type { IActionRepository } from './action-repository.ts';

export interface ActionRouteOpts {
	app: Express;
	commandBus: ICommandBus;
	eventBus: IEventBus;
	actionRepository: IActionRepository;
}

export function actionRoutes({ app, actionRepository }: ActionRouteOpts) {
	const apiNamespace = 'actions';

	getById(app, {
		apiNamespace,
		objectDescriptor: 'Action',
		repository: actionRepository,
		toDto,
	});
}
