import type { CommandBus } from '#command/CommandBus.ts';
import type { EventBus } from '#event/EventBus.ts';
import { getById } from '#shared/route-utils.ts';
import type { Express } from 'express';
import { toDto } from './action-mappers.ts';
import type { ActionRepository } from './action-repository.ts';

export function actionRoutes(
	app: Express,
	_commandBus: CommandBus,
	_eventBus: EventBus,
	actionRepository: ActionRepository,
) {
	const apiNamespace = 'actions';

	getById(app, {
		apiNamespace,
		objectDescriptor: 'Action',
		repository: actionRepository,
		toDto,
	});
}
