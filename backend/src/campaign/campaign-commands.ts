import type { CommandHandlerConfig } from '#command/command-handler.ts';
import { CommandHandler } from '#command/command-handler.ts';
import type { CommandFunction } from '#command/command-types.ts';
import type { Command } from '#command/command.ts';
import { BadRequestError } from '#shared/error.ts';
import { randomUUID } from 'crypto';
import { CampaignCreatedEvent } from './campaign-events.ts';
import type { CampaignRepository } from './campaign-repository.ts';
import { Campaign } from './Campaign.ts';

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

interface CampaignCommandHandlerConfig extends CommandHandlerConfig {
	campaignRepository: CampaignRepository;
}

export class CampaignCommandHandler extends CommandHandler {
	campaignRepository: CampaignRepository;

	constructor(config: CampaignCommandHandlerConfig) {
		super(config);
		this.campaignRepository = config.campaignRepository;
	}

	override async handle(command: Command) {
		const campaign = command.streamId
			? new Campaign(command.streamId, {
					eventRepository: this.eventRepository,
					streamRepository: this.streamRepository,
				})
			: undefined;
		await this.validateCommandVersion(campaign, command);
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
