import { type IMessage } from '#message/IMessage.ts';
import type { UUID } from 'crypto';

export class Command implements IMessage<'Command'> {
	type: 'Command';
	context: string;
	ref: string;
	streamId: UUID | undefined;
	streamVersion: number;
	data: object;

	constructor(
		context: string,
		ref: string,
		streamId: UUID | undefined,
		streamVersion: number,
		data: object,
	) {
		this.type = 'Command';
		this.context = context;
		this.ref = ref;
		this.streamId = streamId;
		this.streamVersion = streamVersion;
		this.data = data;
	}
}
