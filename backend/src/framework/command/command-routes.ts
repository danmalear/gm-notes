import { validateMessage } from '#message/Message.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage, getStatusCode } from '#shared/error.ts';
import { randomUUID } from 'crypto';
import type { Express, Response } from 'express';
import type { CommandResponse } from './command-dtos.ts';
import type { CommandRec, CommandRepository } from './command-repository.ts';
import type { CommandBus } from './CommandBus.ts';

export function commandRoutes(
	app: Express,
	commandBus: CommandBus,
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
				validateMessage(req.body, 'Command');
			} catch (e) {
				res.status(getStatusCode(e)).send({ message: getMessage(e) });
				return;
			}

			const command = req.body;

			const id = randomUUID();
			const correlationId = randomUUID();

			const commandRecord: CommandRec = {
				CommandId: id,
				AggregateId: command.streamId ?? null,
				CorrelationId: correlationId,
				Context: command.context,
				Type: command.type,
				Data: command.data,
				CreatedAt: new Date().toISOString(),
			};

			await commandRepository.insert(commandRecord);

			const aggregateId = await commandBus.send(command);

			res.send({ data: { id: aggregateId } });
		},
	);
}
