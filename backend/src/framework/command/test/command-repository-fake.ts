import { randomUUID } from 'crypto';
import type { CommandRec, CommandRepository } from '../command-repository.ts';

export const command1: CommandRec = {
	CommandId: randomUUID(),
	Context: '',
	Ref: '',
	StreamId: randomUUID(),
	CorrelationId: randomUUID(),
	Data: {},
	CreatedAt: '',
};

export const commandRepository: CommandRepository = {
	tableName: 'es_Command',
	pkColumn: 'CommandId',
	getAll: () => Promise.resolve([]),
	getById: () => Promise.resolve(command1),
	getByIdRaw: () => Promise.resolve(command1),
	insert: () => Promise.resolve(command1),
	update: () => Promise.resolve(command1),
};
