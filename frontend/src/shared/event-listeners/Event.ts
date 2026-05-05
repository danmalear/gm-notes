import type { UUID } from 'crypto';

export interface Event {
	context: string;
	ref: string;
	streamId: UUID;
	correlationId: UUID;
	streamVersion: number;
	data: object;
}
