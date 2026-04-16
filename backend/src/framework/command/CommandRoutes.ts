import { BadRequestError, getMessage, getStatusCode } from '#shared/error.ts';
import { randomUUID } from 'crypto';
import type { Express } from 'express';
import type { CommandRequestBase } from './command-types.ts';
import type { Command } from './Command.ts';
import { CommandRepository } from './CommandRepository.ts';

export class CommandRoutes {
	static readonly apiNamespace = 'commands';

	commandRepository: CommandRepository;

	constructor() {
		this.commandRepository = new CommandRepository();
	}

	init(app: Express) {
		app.post(`/${CommandRoutes.apiNamespace}`, async (req, res) => {
			console.log(`Command received. body: ${JSON.stringify(req.body)}`);

			function validateBody(body: unknown): asserts body is CommandRequestBase {
				if (!body) {
					throw new BadRequestError(`No body supplied to command request`);
				}
				if (typeof body !== 'object' || Array.isArray(body)) {
					throw new BadRequestError('Invalid body supplied to command request');
				}
				if (
					!('commandType' in body) ||
					!body.commandType ||
					typeof body.commandType !== 'string' ||
					body.commandType.split('/').length < 2
				) {
					throw new BadRequestError(
						'Invalid commandType supplied to command request',
					);
				}
				if (
					!('command' in body) ||
					!body.command ||
					typeof body.command !== 'object'
				) {
					throw new BadRequestError(
						'Invalid command supplied to command request',
					);
				}
			}

			try {
				validateBody(req.body);
			} catch (e) {
				res.status(getStatusCode(e)).send({ message: getMessage(e) });
				return;
			}

			const id = randomUUID();
			const correlationId = randomUUID();

			const [context, commandType] = req.body.commandType.split('/');

			const command: Command = {
				CommandId: id,
				AggregateId: null, // @TODO
				CorrelationId: correlationId,
				Context: context,
				Type: commandType,
				Data: req.body.command,
			};

			await this.commandRepository.insert(command);

			// @TODO command handler

			res.send({ data: { id } });
		});
	}
}
