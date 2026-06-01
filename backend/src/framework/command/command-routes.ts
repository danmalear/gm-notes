import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage, getStatusCode } from '#shared/error.ts';
import type { Express, Response } from 'express';
import { randomUUID } from 'node:crypto';
import type { ICommandBus } from './command-bus.ts';
import {
	validateCommandRequest,
	type CommandResponse,
} from './command-dtos.ts';
import type { ICommand } from './command.ts';

export function commandRoutes(app: Express, commandBus: ICommandBus) {
	const apiNamespace = 'commands';

	app.post(
		`/${apiNamespace}`,
		async (
			req,
			res: Response<MessageResponse | DataResponse<CommandResponse>>,
		) => {
			console.log(`Command received. body: ${JSON.stringify(req.body)}`);

			try {
				validateCommandRequest(req.body);
			} catch (e) {
				res.status(getStatusCode(e)).send({ message: getMessage(e) });
				return;
			}

			const command: ICommand = {
				context: req.body.context,
				ref: req.body.ref,
				streamId: req.body.streamId,
				correlationId: randomUUID(),
				streamVersion: req.body.streamVersion,
				data: req.body.data,
			};

			const correlationId = await commandBus.send(command);

			res.send({ data: { correlationId: correlationId } });
		},
	);
}
