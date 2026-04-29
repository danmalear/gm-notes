import { MessageBus, type IMessageBus } from '#message/MessageBus.ts';
import { NotFoundError } from '#shared/error.ts';
import { randomUUID, type UUID } from 'crypto';
import type { Command } from './Command.ts';
import type { CommandRec, CommandRepository } from './command-repository.ts';

export type ICommandBus = IMessageBus<'Command'>;

export class CommandBus extends MessageBus<'Command'> implements ICommandBus {
	commandRepository: CommandRepository;

	constructor(commandRepository: CommandRepository) {
		super('Command');
		this.commandRepository = commandRepository;
	}

	override async send<TCommand extends Command>(
		message: TCommand,
	): Promise<UUID> {
		if (!this.subscribers[message.context]) {
			throw new NotFoundError(
				`Context ${message.context} for command request not found`,
			);
		}

		const id = randomUUID();
		const correlationId = randomUUID();

		const commandRecord: CommandRec = {
			CommandId: id,
			StreamId: message.streamId ?? null,
			CorrelationId: correlationId,
			Context: message.context,
			Ref: message.ref,
			Data: message.data,
			CreatedAt: new Date().toISOString(),
		};

		await this.commandRepository.insert(commandRecord);
		return await super.send(message);
	}
}
