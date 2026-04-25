import type { UUID } from 'crypto';

export const tableName = 'es_Command';
export const pkColumn = 'CommandId';

export interface Command {
	CommandId: UUID;
	AggregateId: UUID | null;
	CorrelationId: UUID;
	Context: string;
	Type: string;
	Data: object;
	CreatedAt: string;
}
