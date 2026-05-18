import { Command } from '#command/Command.ts';
import { randomUUID } from 'crypto';
import type { CommandRec } from '../command-repository.ts';

const commandId = randomUUID();
const context = 'Context';
const ref = 'DoThis';
const streamId = randomUUID();
const correlationId = randomUUID();
const streamVersion = 0;
const data = {
	prop1: 'string',
	prop2: 1,
};
const createdAt = new Date('01/01/2026').toUTCString();

export const fakeCommandRequest = {
	context,
	ref,
	streamId,
	streamVersion,
	data,
};

export const fakeCommand = new Command({
	context,
	ref,
	streamId,
	correlationId,
	streamVersion,
	data,
});

export const fakeCommandRec: CommandRec = {
	CommandId: commandId,
	Context: context,
	Ref: ref,
	StreamId: streamId,
	CorrelationId: correlationId,
	Data: data,
	CreatedAt: createdAt,
};
