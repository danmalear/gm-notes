import type { ICommand } from '#command/command.ts';
import type { CommandModel } from '#prisma-models/Command.ts';
import { randomUUID } from 'crypto';

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
const createdAt = new Date('01/01/2026');

export const fakeCommandRequest = {
	context,
	ref,
	streamId,
	streamVersion,
	data,
};

export const fakeCommand: ICommand = {
	context,
	ref,
	streamId,
	correlationId,
	streamVersion,
	data,
};

export const fakeCommandModel: CommandModel = {
	CommandId: commandId,
	Context: context,
	Ref: ref,
	StreamId: streamId,
	CorrelationId: correlationId,
	Data: data,
	CreatedAt: createdAt,
};
