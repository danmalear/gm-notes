import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage, getStatusCode } from '#shared/error.ts';
import { randomUUID } from 'crypto';
import type { Express, Response } from 'express';
import {
	validateCommandRequest,
	type CommandResponse,
} from './command-dtos.ts';
import type { Command } from './Command.ts';
import type { CommandRepository } from './CommandRepository.ts';
import type { CommandRouter } from './CommandRouter.ts';

export function commandRoutes(
	app: Express,
	commandRouter: CommandRouter,
	commandRepository: CommandRepository,
) {
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

			const commandRequest = req.body;

			const id = randomUUID();
			const correlationId = randomUUID();

			const command: Command = {
				CommandId: id,
				AggregateId: null, // @TODO
				CorrelationId: correlationId,
				Context: commandRequest.domain,
				Type: commandRequest.commandType,
				Data: commandRequest.command,
			};

			await commandRepository.insert(command);

			const aggregateId = await commandRouter.send(commandRequest);

			res.send({ data: { id: aggregateId } });
		},
	);

	return {
		commandRepository,
	};
}
