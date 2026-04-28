import type { CommandFunction } from '#command/command-types.ts';
import type { Command } from '#command/Command.ts';
import type { ICommandSubscriber } from '#command/ICommandSubscriber.ts';
import type { IEventBus } from '#event/EventBus.ts';
import { BadRequestError } from '#shared/error.ts';
import { randomUUID } from 'crypto';
import type { CampaignRec, CampaignRepository } from './campaign-repository.ts';
import { CampaignCreatedEvent } from './Campaign.ts';

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
				return await this.Create(command.data);
			default:
				throw new BadRequestError(`Invalid campaign command: ${command.ref}`);
		}
	}

	Create: CommandFunction = async (command) => {
		const id = randomUUID();

		validateCreateCampaign(command);

		const event = new CampaignCreatedEvent(id, {
			id,
			name: command.name,
		});

		await this.eventBus.send(event);

		// @TODO projection listener
		const campaign: CampaignRec = {
			CampaignId: id,
			CampaignTemplateId: null,
			Name: command.name,
			ActiveMapId: null,
		};

		await this.campaignRepository.insert(campaign);

		return id;
	};
}
