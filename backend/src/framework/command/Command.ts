import { type IMessage } from '#message/IMessage.ts';
import { randomUUID, type UUID } from 'crypto';

interface CommandOpts {
	context: string;
	ref: string;
	streamId: UUID | undefined;
	correlationId?: UUID;
	streamVersion?: number;
	data: object;
}

export class Command implements IMessage<'Command'> {
	type: 'Command';
	context: string;
	ref: string;
	streamId: UUID | undefined;
	correlationId: UUID;
	streamVersion: number | undefined;
	data: object;

	constructor({
		context,
		ref,
		streamId,
		correlationId,
		streamVersion,
		data,
	}: CommandOpts) {
		this.type = 'Command';
		this.context = context;
		this.ref = ref;
		this.streamId = streamId;
		this.correlationId = correlationId ?? randomUUID();
		this.streamVersion = streamVersion;
		this.data = data;
	}
}
