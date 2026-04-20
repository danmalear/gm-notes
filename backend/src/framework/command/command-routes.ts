import { getMessage, getStatusCode } from '#shared/error.ts';
import { randomUUID } from 'crypto';
import type { Express } from 'express';
import { validateCommandRequest } from './command-dtos.ts';
import type { Command } from './Command.ts';
import { CommandRepository } from './CommandRepository.ts';
import { CommandRouter } from './CommandRouter.ts';

export function commandRoutes(app: Express, commandRouter: CommandRouter) {
	const apiNamespace = 'commands';
	const commandRepository = new CommandRepository();

	app.post(`/${apiNamespace}`, async (req, res) => {
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

		commandRouter.send(commandRequest);

		res.send({ data: { id } });
	});

	return {
		commandRepository,
	};
}
