import { validateMessage } from '#message/Message.ts';
import type { MessageBus } from '#message/MessageBus.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage, getStatusCode } from '#shared/error.ts';
import { randomUUID } from 'crypto';
import type { Express, Response } from 'express';
import type { CommandResponse } from './command-dtos.ts';
import type { Command } from './Command.ts';
import type { CommandRepository } from './CommandRepository.ts';

export function commandRoutes(
	app: Express,
	messageBus: MessageBus,
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
				validateMessage(req.body);
			} catch (e) {
				res.status(getStatusCode(e)).send({ message: getMessage(e) });
				return;
			}

			const command = req.body;

			const id = randomUUID();
			const correlationId = randomUUID();

			const commandRecord: Command = {
				CommandId: id,
				AggregateId: command.streamId ?? null,
				CorrelationId: correlationId,
				Context: command.context,
				Type: command.type,
				Data: command.data,
				CreatedAt: new Date().toISOString(),
			};

			await commandRepository.insert(commandRecord);

			const aggregateId = await messageBus.send(command);

			res.send({ data: { id: aggregateId } });
		},
	);
}
