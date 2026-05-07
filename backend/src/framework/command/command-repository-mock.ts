import { randomUUID, type UUID } from 'crypto';
import type { CommandRec, CommandRepository } from './command-repository.ts';

const commandId1 = randomUUID();
const streamId1 = randomUUID();
const correlationId1 = randomUUID();
const data1 = {
	prop1: 'string',
	prop2: 1,
};
const createdAt1 = new Date('01/01/2026').toUTCString();
const command1: CommandRec = {
	CommandId: commandId1,
	Context: 'Context',
	Ref: 'DoThis',
	StreamId: streamId1,
	CorrelationId: correlationId1,
	Data: data1,
	CreatedAt: createdAt1,
};
const commandId2 = randomUUID();
const streamId2 = randomUUID();
const correlationId2 = randomUUID();
const data2 = {
	prop1: 'string',
	prop2: 2,
};
const createdAt2 = new Date('01/02/2026').toUTCString();
const command2: CommandRec = {
	CommandId: commandId2,
	Context: 'Context',
	Ref: 'DoThis',
	StreamId: streamId2,
	CorrelationId: correlationId2,
	Data: data2,
	CreatedAt: createdAt2,
};
const commands: CommandRec[] = [command1, command2];
export const commandRepository: CommandRepository = {
	tableName: 'es_Command',
	pkColumn: 'CommandId',
	getAll() {
		return Promise.resolve(commands);
	},
	getById: function (id: UUID): Promise<CommandRec | undefined> {
		return Promise.resolve(commands.find((c) => c.CommandId === id));
	},
	getByIdRaw: function (id: UUID): Promise<CommandRec | undefined> {
		return Promise.resolve(commands.find((c) => c.CommandId === id));
	},
	insert: function (data: CommandRec): Promise<CommandRec> {
		return Promise.resolve(data);
	},
	update: function (id: UUID, _data: Partial<CommandRec>): Promise<CommandRec> {
		return Promise.resolve(
			commands.find((c) => c.CommandId === id) ?? command1,
		);
	},
};
