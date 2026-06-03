import type { ICommandBus } from '#command/command-bus.ts';
import type { IEventBus } from '#event/event-bus.ts';
import { getByIdDEPRECATED } from '#shared/route-utils.ts';
import type { Express } from 'express';
import { toDto } from './action-mappers.ts';
import type { ActionRepository } from './action-repository.ts';

export function actionRoutes(
	app: Express,
	_commandBus: ICommandBus,
	_eventBus: IEventBus,
	actionRepository: ActionRepository,
) {
	const apiNamespace = 'actions';

	getByIdDEPRECATED(app, {
		apiNamespace,
		objectDescriptor: 'Action',
		repository: actionRepository,
		toDto,
	});
}
