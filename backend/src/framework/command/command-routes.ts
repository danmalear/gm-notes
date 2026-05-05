import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage, getStatusCode } from '#shared/error.ts';
import type { Express, Response } from 'express';
import { validateCommand, type CommandResponse } from './command-dtos.ts';
import { Command } from './Command.ts';
import type { ICommandBus } from './CommandBus.ts';

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
				validateCommand(req.body);
			} catch (e) {
				res.status(getStatusCode(e)).send({ message: getMessage(e) });
				return;
			}

			const command = new Command({
				context: req.body.context,
				ref: req.body.ref,
				streamId: req.body.streamId,
				streamVersion: req.body.streamVersion,
				data: req.body.data,
			});

			const aggregateId = await commandBus.send(command);

			res.send({ data: { id: aggregateId } });
		},
	);
}
