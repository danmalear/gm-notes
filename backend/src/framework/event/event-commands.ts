import type { CommandHandlerConfig } from '#command/command-handler.ts';
import { CommandHandler } from '#command/command-handler.ts';
import type { CommandFunction } from '#command/command-types.ts';
import type { ICommand } from '#command/command.ts';
import { RawStream } from '#framework/stream/stream-temp.ts';
import { BadRequestError, NotFoundError } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import type { UUID } from 'crypto';
import type { IEvent } from './event.ts';

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

export function validateApplyEvent(
	command: unknown,
): asserts command is ApplyEvent {
	if (!command) {
		throw new BadRequestError(`No data supplied to Apply Event command`);
	}
	if (typeof command !== 'object' || Array.isArray(command)) {
		throw new BadRequestError(`Invalid data supplied to Apply Event command`);
	}

	// context: string;
	if (!('context' in command) || !command.context) {
		throw new BadRequestError('No context supplied to Apply Event command');
	}
	if (typeof command.context !== 'string') {
		throw new BadRequestError(
			'Invalid context supplied to Apply Event command',
		);
	}

	// ref: string;
	if (!('ref' in command) || !command.ref) {
		throw new BadRequestError('No ref supplied to Apply Event command');
	}
	if (typeof command.ref !== 'string') {
		throw new BadRequestError('Invalid ref supplied to Apply Event command');
	}

	// streamId: UUID;
	if (!('streamId' in command) || !command.streamId) {
		throw new BadRequestError('No stream ID supplied to Apply Event command');
	}
	if (typeof command.streamId !== 'string' || !isUUID(command.streamId)) {
		throw new BadRequestError(
			'Invalid stream ID supplied to Apply Event command',
		);
	}

	// streamVersion: number;
	if (!('streamVersion' in command) || !command.streamVersion) {
		throw new BadRequestError(
			'No stream version supplied to Apply Event command',
		);
	}
	if (typeof command.streamVersion !== 'number') {
		throw new BadRequestError(
			'Invalid stream version supplied to Apply Event command',
		);
	}

	// data: object;
	if (!('data' in command) || !command.data) {
		throw new BadRequestError('No data supplied to Apply Event command');
	}
	if (typeof command.data !== 'object') {
		throw new BadRequestError('Invalid data supplied to Apply Event command');
	}
}

type EventCommandHandlerConfig = CommandHandlerConfig;

export class EventCommandHandler extends CommandHandler {
	constructor(config: EventCommandHandlerConfig) {
		super(config);
	}

	override async handle(command: ICommand) {
		const stream = command.streamId
			? new RawStream(command.streamId, {
					eventRepository: this.eventRepository,
					streamRepository: this.streamRepository,
				})
			: undefined;
		if (command.streamId && !stream) {
			throw new NotFoundError(`Stream not found with ID ${command.streamId}.`);
		}
		await this.validateCommandVersion(stream, command);
		if (command.context !== 'Event') {
			throw new BadRequestError(
				'Non-event command submitted to event command handler',
			);
		}
		switch (command.ref) {
			case 'Apply':
				await this.Apply(command, command.streamVersion);
				break;
			default:
				throw new BadRequestError(`Invalid event command: ${command.ref}`);
		}
	}

	Apply: CommandFunction = async (command, streamVersion = 0) => {
		validateApplyEvent(command.data);

		const event: IEvent = {
			context: command.data.context,
			ref: command.data.ref,
			streamId: command.data.streamId,
			correlationId: command.correlationId,
			streamVersion: streamVersion + 1,
			data: command.data,
		};

		return await this.eventBus.send(event);
	};
}
