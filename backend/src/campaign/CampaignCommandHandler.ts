import { CommandRequest } from '#command/command-dtos.ts';
import { CommandFunction } from '#command/command-types.ts';
import { ICommandHandler } from '#command/ICommandHandler.ts';
import { BadRequestError } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import { randomUUID, type UUID } from 'crypto';
import type { Campaign } from './Campaign.ts';
import { CampaignRepository } from './CampaignRepository.ts';

export interface CreateCampaign {
	name: string;
}

export interface UpdateCampaign {
	id: UUID;
	name?: string;
	activeMapId?: UUID;
}

interface CampaignRequest extends CommandRequest {
	domain: 'Campaign';
}

interface CreateCampaignRequest extends CampaignRequest {
	commandType: 'Create';
	command: CreateCampaign;
}

interface UpdateCampaignRequest extends CampaignRequest {
	commandType: 'Update';
	command: UpdateCampaign;
}

type CampaignCommandRequest = CreateCampaignRequest | UpdateCampaignRequest;

export class CampaignCommandHandler
	implements ICommandHandler<CampaignCommandRequest>
{
	campaignRepository: CampaignRepository;

	constructor(campaignRepository: CampaignRepository) {
		this.campaignRepository = campaignRepository;
	}

	async handle(commandRequest: CampaignCommandRequest) {
		switch (commandRequest.commandType) {
			case 'Create':
				await this.Create(commandRequest.command);
				break;
			case 'Update':
				await this.Update(commandRequest.command);
				break;
			default:
				throw new BadRequestError(
					`Invalid campaign command: ${(commandRequest as CommandRequest).commandType}`,
				);
		}
	}

	Create: CommandFunction<CreateCampaign> = async (command) => {
		if (!command.name) {
			throw new BadRequestError('Campaigns must have a name specified');
		}
		if (typeof command.name !== 'string') {
			throw new BadRequestError(
				`Invalid name specified for campaign: ${command.name}`,
			);
		}

		const id = randomUUID();

		const campaign: Campaign = {
			CampaignId: id,
			CampaignTemplateId: null,
			Name: command.name,
			ActiveMapId: null,
		};

		// @TODO apply event
		await this.campaignRepository.insert(campaign);

		return {
			id,
		};
	};

	// @TODO
	Update: CommandFunction<UpdateCampaign> = async (command) => {
		if (
			typeof command.name !== 'undefined' &&
			typeof command.name !== 'string'
		) {
			throw new BadRequestError(
				`Invalid name specified for campaign: ${command.name}`,
			);
		}
		if (
			typeof command.activeMapId !== 'undefined' &&
			(typeof command.activeMapId !== 'string' || !isUUID(command.activeMapId))
		) {
			throw new BadRequestError(
				`Invalid ID specified for campaign active map: ${command.activeMapId}`,
			);
		}

		// @TODO apply event

		return {
			id: randomUUID(), // @TODO this is just a placeholder -  should return existing aggregate ID
		};
	};
}
