import { type IMessage } from '#message/IMessage.ts';
import { randomUUID, type UUID } from 'crypto';

export class Command implements IMessage<'Command'> {
	type: 'Command';
	context: string;
	ref: string;
	streamId: UUID | undefined;
	correlationId: UUID;
	streamVersion: number;
	data: object;

	constructor(
		context: string,
		ref: string,
		streamId: UUID | undefined,
		correlationId: UUID | undefined,
		streamVersion: number,
		data: object,
	) {
		this.type = 'Command';
		this.context = context;
		this.ref = ref;
		this.streamId = streamId;
		this.correlationId = correlationId ?? randomUUID();
		this.streamVersion = streamVersion;
		this.data = data;
	}
}
