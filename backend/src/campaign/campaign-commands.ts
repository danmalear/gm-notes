import type { CommandFunction } from '#command/command-types.ts';
import type { Command } from '#command/Command.ts';
import type { ICommandSubscriber } from '#command/ICommandSubscriber.ts';
import type { IEventBus } from '#event/EventBus.ts';
import { BadRequestError } from '#shared/error.ts';
import { randomUUID } from 'crypto';
import { CampaignCreatedEvent } from './campaign-events.ts';
import type { CampaignRepository } from './campaign-repository.ts';

export interface CreateCampaign {
	name: string;
}

function validateCreateCampaign(
	command: object,
): asserts command is CreateCampaign {
	if (!('name' in command) || !command.name) {
		throw new BadRequestError('New campaigns must have a name specified');
	}
	if (typeof command.name !== 'string') {
		throw new BadRequestError(
			`Invalid name specified for new campaign: ${command.name}`,
		);
	}
}

export class CampaignCommandHandler implements ICommandSubscriber {
	eventBus: IEventBus;
	campaignRepository: CampaignRepository;

	constructor(eventBus: IEventBus, campaignRepository: CampaignRepository) {
		this.eventBus = eventBus;
		this.campaignRepository = campaignRepository;
	}

	async handle(command: Command) {
		if (command.context !== 'Campaign') {
			throw new BadRequestError(
				'Non-campaign command submitted to campaign command handler',
			);
		}
		switch (command.ref) {
			case 'Create':
				await this.Create(command);
				break;
			default:
				throw new BadRequestError(`Invalid campaign command: ${command.ref}`);
		}
	}

	Create: CommandFunction = async (command) => {
		const id = randomUUID();

		validateCreateCampaign(command.data);

		const event = new CampaignCreatedEvent({
			streamId: id,
			correlationId: command.correlationId,
			streamVersion: 1,
			data: {
				id,
				name: command.data.name,
			},
		});

		return await this.eventBus.send(event);
	};
}
