import type { CommandRequest } from '#shared/dtos.ts';
import type { UUID } from 'crypto';

export type EventCommand<
	TRef extends string,
	TData extends object,
> = CommandRequest<'Event', TRef, TData>;

/**
 * Applies an event manually, for dev use to make manual changes to the event ledger
 */
export interface ApplyEvent {
	context: string;
	ref: string;
	streamId: UUID;
	streamVersion: number;
	data: object;
}

export interface ApplyEventCommand extends EventCommand<'Apply', ApplyEvent> {
	streamId?: undefined;
}
