import type { CommandFunction } from '#command/command-types.ts';
import type { Command } from '#command/Command.ts';
import type { ICommandSubscriber } from '#command/ICommandSubscriber.ts';
import { BadRequestError, NotImplementedError } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import { randomUUID, type UUID } from 'crypto';
import type { CampaignRec, CampaignRepository } from './campaign-repository.ts';

export interface CreateCampaign {
	name: string;
}

function validateCreateCampaign(
	command: object,
): asserts command is CreateCampaign {
	if (!('name' in command) || !command.name) {
		throw new BadRequestError('Campaigns must have a name specified');
	}
	if (typeof command.name !== 'string') {
		throw new BadRequestError(
			`Invalid name specified for campaign: ${command.name}`,
		);
	}
}

export interface UpdateCampaign {
	id: UUID;
	name?: string;
	activeMapId?: UUID;
}

function validateUpdateCampaign(
	command: object,
): asserts command is UpdateCampaign {
	if (
		'name' in command &&
		typeof command.name !== 'undefined' &&
		typeof command.name !== 'string'
	) {
		throw new BadRequestError(
			`Invalid name specified for campaign: ${command.name}`,
		);
	}
	if (
		'activeMapId' in command &&
		typeof command.activeMapId !== 'undefined' &&
		(typeof command.activeMapId !== 'string' || !isUUID(command.activeMapId))
	) {
		throw new BadRequestError(
			`Invalid ID specified for campaign active map: ${command.activeMapId}`,
		);
	}
}

type CreateCampaignCommand = Command<'Campaign', 'Create', CreateCampaign>;
type UpdateCampaignCommand = Command<'Campaign', 'Update', UpdateCampaign>;

export type CampaignCommand = CreateCampaignCommand | UpdateCampaignCommand;

function validateCampaignCommand(
	command: Command,
): asserts command is CampaignCommand {
	if (command.context !== 'Campaign') {
		throw new BadRequestError(
			'Non-campaign command submitted to campaign command handler',
		);
	}
	switch (command.ref) {
		case 'Create':
			validateCreateCampaign(command.data);
			break;
		case 'Update':
			validateUpdateCampaign(command.data);
			break;
		default:
			throw new BadRequestError(`Invalid campaign command: ${command.type}`);
	}
}

// @TODO Maybe type param could be CampaignCommand? Depends if it's pre-validated
export class CampaignCommandHandler implements ICommandSubscriber<Command> {
	campaignRepository: CampaignRepository;

	constructor(campaignRepository: CampaignRepository) {
		this.campaignRepository = campaignRepository;
	}

	async handle(command: Command) {
		validateCampaignCommand(command);
		switch (command.ref) {
			case 'Create':
				return await this.Create(command.data);
			case 'Update':
				return await this.Update(command.data);
		}
	}

	Create: CommandFunction<CreateCampaign> = async (command) => {
		const id = randomUUID();

		const campaign: CampaignRec = {
			CampaignId: id,
			CampaignTemplateId: null,
			Name: command.name,
			ActiveMapId: null,
		};

		// @TODO apply event
		await this.campaignRepository.insert(campaign);

		return id;
	};

	// @TODO
	Update: CommandFunction<UpdateCampaign> = async (_command) => {
		throw new NotImplementedError();
	};
}
