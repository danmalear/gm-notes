import type { CommandRequest } from '#command/command-dtos.ts';
import type { CommandFunction } from '#command/command-types.ts';
import type { ICommandHandler } from '#command/ICommandHandler.ts';
import { BadRequestError, NotImplementedError } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import { randomUUID, type UUID } from 'crypto';
import type { CampaignRaw } from './Campaign.ts';
import type { CampaignRepository } from './CampaignRepository.ts';

export interface CreateCampaign {
	name: string;
}

export interface UpdateCampaign {
	id: UUID;
	name?: string;
	activeMapId?: UUID;
}

export interface CampaignRequest extends CommandRequest {
	context: 'Campaign';
}

interface CreateCampaignRequest extends CampaignRequest {
	commandType: 'Create';
	commandData: CreateCampaign;
}

interface UpdateCampaignRequest extends CampaignRequest {
	commandType: 'Update';
	commandData: UpdateCampaign;
}

export type CampaignCommandRequest =
	| CreateCampaignRequest
	| UpdateCampaignRequest;

function validateCampaignCommandRequest(
	commandRequest: CommandRequest,
): asserts commandRequest is CampaignCommandRequest {
	const { commandType, commandData } = commandRequest;
	switch (commandType) {
		case 'Create':
			if (!('name' in commandData) || !commandData.name) {
				throw new BadRequestError('Campaigns must have a name specified');
			}
			if (typeof commandData.name !== 'string') {
				throw new BadRequestError(
					`Invalid name specified for campaign: ${commandData.name}`,
				);
			}
			break;
		case 'Update':
			if (
				'name' in commandData &&
				typeof commandData.name !== 'undefined' &&
				typeof commandData.name !== 'string'
			) {
				throw new BadRequestError(
					`Invalid name specified for campaign: ${commandData.name}`,
				);
			}
			if (
				'activeMapId' in commandData &&
				typeof commandData.activeMapId !== 'undefined' &&
				(typeof commandData.activeMapId !== 'string' ||
					!isUUID(commandData.activeMapId))
			) {
				throw new BadRequestError(
					`Invalid ID specified for campaign active map: ${commandData.activeMapId}`,
				);
			}
			break;
		default:
			throw new BadRequestError(
				`Invalid campaign command: ${(commandRequest as CommandRequest).commandType}`,
			);
	}
}

export class CampaignCommandHandler implements ICommandHandler {
	campaignRepository: CampaignRepository;

	constructor(campaignRepository: CampaignRepository) {
		this.campaignRepository = campaignRepository;
	}

	async handle(commandRequest: CommandRequest) {
		validateCampaignCommandRequest(commandRequest);
		switch (commandRequest.commandType) {
			case 'Create':
				return await this.Create(commandRequest.commandData);
			case 'Update':
				return await this.Update(commandRequest.commandData);
		}
	}

	Create: CommandFunction<CreateCampaign> = async (command) => {
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
	Update: CommandFunction<UpdateCampaign> = async (_command) => {
		throw new NotImplementedError();
	};
}
