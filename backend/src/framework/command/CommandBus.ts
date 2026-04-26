import { MessageBus, type IMessageBus } from '#message/MessageBus.ts';

export type ICommandBus = IMessageBus<'Command'>;

export class CommandBus extends MessageBus<'Command'> implements ICommandBus {
	constructor() {
		super('Command');
	}
}
