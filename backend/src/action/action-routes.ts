import type { CommandRouter } from '#command/CommandRouter.ts';
import { getById } from '#shared/route-utils.ts';
import type { Express } from 'express';
import type { ActionRepository } from './ActionRepository.ts';
import { toDto } from './action-mappers.ts';

export function actionRoutes(
	app: Express,
	_commandRouter: CommandRouter,
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
