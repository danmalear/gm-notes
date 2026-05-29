import { MessageBus, type IMessageBus } from '#message/MessageBus.ts';
import type { CommandCreateInput } from '#prisma/generated/models.ts';
import { NotFoundError } from '#shared/error.ts';
import { randomUUID, type UUID } from 'crypto';
import type { Command } from './Command.ts';
import type { CommandRepository } from './command-repository.ts';

export type ICommandBus = IMessageBus<'Command', Command>;

export class CommandBus
	extends MessageBus<'Command', Command>
	implements ICommandBus
{
	commandRepository: CommandRepository;

	constructor(commandRepository: CommandRepository) {
		super();
		this.commandRepository = commandRepository;
	}

	override async send(command: Command): Promise<UUID> {
		if (!this.subscribers[command.context]) {
			throw new NotFoundError(
				`Context ${command.context} for command request not found`,
			);
		}

		const id = randomUUID();

		const commandModel: CommandCreateInput = {
			CommandId: id,
			StreamId: command.streamId ?? null,
			CorrelationId: command.correlationId,
			Context: command.context,
			Ref: command.ref,
			Data: command.data,
			CreatedAt: new Date(),
		};

		await this.commandRepository.insert(commandModel);
		return await super.send(command);
	}
}
