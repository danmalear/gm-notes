import type { CommandFunction } from '#command/command-types.ts';
import type { IMessageSubscriber } from '#message/IMessageSubscriber.ts';
import type { Message } from '#message/Message.ts';
import { BadRequestError, NotImplementedError } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import { randomUUID, type UUID } from 'crypto';
import type { CampaignRaw } from './Campaign.ts';
import type { CampaignRepository } from './CampaignRepository.ts';

export interface CreateCampaignData {
	name: string;
}

export interface UpdateCampaignData {
	id: UUID;
	name?: string;
	activeMapId?: UUID;
}

export interface CampaignCommandBase extends Message {
	context: 'Campaign';
}

interface CreateCampaign extends CampaignCommandBase {
	type: 'Create';
	data: CreateCampaignData;
}

interface UpdateCampaign extends CampaignCommandBase {
	type: 'Update';
	data: UpdateCampaignData;
}

export type CampaignCommand = CreateCampaign | UpdateCampaign;

function validateCampaignCommandRequest(
	command: Message,
): asserts command is CampaignCommand {
	if (command.context !== 'Campaign') {
		throw new BadRequestError(
			'Non-campaign command submitted to campaign command handler',
		);
	}
	switch (command.type) {
		case 'Create':
			if (!('name' in command.data) || !command.data.name) {
				throw new BadRequestError('Campaigns must have a name specified');
			}
			if (typeof command.data.name !== 'string') {
				throw new BadRequestError(
					`Invalid name specified for campaign: ${command.data.name}`,
				);
			}
			break;
		case 'Update':
			if (
				'name' in command.data &&
				typeof command.data.name !== 'undefined' &&
				typeof command.data.name !== 'string'
			) {
				throw new BadRequestError(
					`Invalid name specified for campaign: ${command.data.name}`,
				);
			}
			if (
				'activeMapId' in command.data &&
				typeof command.data.activeMapId !== 'undefined' &&
				(typeof command.data.activeMapId !== 'string' ||
					!isUUID(command.data.activeMapId))
			) {
				throw new BadRequestError(
					`Invalid ID specified for campaign active map: ${command.data.activeMapId}`,
				);
			}
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
		validateCampaignCommandRequest(command);
		switch (command.type) {
			case 'Create':
				return await this.Create(command.data);
			case 'Update':
				return await this.Update(command.data);
		}
	}

	Create: CommandFunction<CreateCampaignData> = async (command) => {
		const id = randomUUID();

		const campaign: CampaignRaw = {
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
	Update: CommandFunction<UpdateCampaignData> = async (_command) => {
		throw new NotImplementedError();
	};
}
