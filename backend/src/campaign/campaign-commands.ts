import type { CommandFunction } from '#command/command-types.ts';
import type { IMessageSubscriber } from '#message/IMessageSubscriber.ts';
import type { Message } from '#message/Message.ts';
import { BadRequestError, NotImplementedError } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import { randomUUID, type UUID } from 'crypto';
import type { CampaignRec, CampaignRepository } from './campaign-repository.ts';

export type CampaignCommandContext = 'CampaignCommand';

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

type CreateCampaignCommand = Message<
	CampaignCommandContext,
	'Create',
	CreateCampaign
>;

type UpdateCampaignCommand = Message<
	CampaignCommandContext,
	'Update',
	UpdateCampaign
>;

export type CampaignCommand = CreateCampaignCommand | UpdateCampaignCommand;

function validateCampaignCommand(
	command: Message,
): asserts command is CampaignCommand {
	if (command.context !== 'CampaignCommand') {
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

export class CampaignCommandHandler implements IMessageSubscriber {
	campaignRepository: CampaignRepository;

	constructor(campaignRepository: CampaignRepository) {
		this.campaignRepository = campaignRepository;
	}

	async handle(command: Message) {
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
