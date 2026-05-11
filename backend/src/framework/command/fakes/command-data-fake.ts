import { randomUUID } from 'crypto';
import type { CommandRec } from '../command-repository.ts';

const commandId = randomUUID();
const context = 'Context';
const ref = 'DoThis';
const streamId = randomUUID();
const correlationId = randomUUID();
const data = {
	prop1: 'string',
	prop2: 1,
};
const createdAt = new Date('01/01/2026').toUTCString();

export const fakeCommand: CommandRec = {
	CommandId: commandId,
	Context: context,
	Ref: ref,
	StreamId: streamId,
	CorrelationId: correlationId,
	Data: data,
	CreatedAt: createdAt,
};
