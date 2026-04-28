import { MessageBus, type IMessageBus } from '#message/MessageBus.ts';
import { NotFoundError } from '#shared/error.ts';
import type { UUID } from 'crypto';
import type { Command } from './Command.ts';

export type ICommandBus = IMessageBus<'Command'>;

export class CommandBus extends MessageBus<'Command'> implements ICommandBus {
	constructor() {
		super('Command');
	}

	override send<TCommand extends Command>(message: TCommand): Promise<UUID> {
		if (!this.subscribers[message.context]) {
			throw new NotFoundError(
				`Context ${message.context} for command request not found`,
			);
		}
		return super.send(message);
	}
}
