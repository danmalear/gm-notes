import { MessageBus, type IMessageBus } from '#message/message-bus.ts';
import type { CommandCreateInput } from '#prisma/generated/models.ts';
import { NotFoundError } from '#shared/error.ts';
import { randomUUID, type UUID } from 'crypto';
import type { ICommandRepository } from './command-repository.ts';
import type { ICommand } from './command.ts';

export type ICommandBus = IMessageBus<ICommand>;

export interface CommandBusConfig {
	commandRepository: ICommandRepository;
}

export class CommandBus extends MessageBus<ICommand> implements ICommandBus {
	commandRepository: ICommandRepository;

	constructor({ commandRepository }: CommandBusConfig) {
		super();
		this.commandRepository = commandRepository;
	}

	override async send(command: ICommand): Promise<UUID> {
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
