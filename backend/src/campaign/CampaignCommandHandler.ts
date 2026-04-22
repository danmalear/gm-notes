import type { CommandRequest } from '#command/command-dtos.ts';
import type { CommandFunction } from '#command/command-types.ts';
import type { ICommandHandler } from '#command/ICommandHandler.ts';
import { BadRequestError } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import { randomUUID, type UUID } from 'crypto';
import type { CampaignRaw } from './Campaign.ts';
import { CampaignRepository } from './CampaignRepository.ts';

export interface CreateCampaign {
	name: string;
}

export interface UpdateCampaign {
	id: UUID;
	name?: string;
	activeMapId?: UUID;
}

export interface CampaignRequest extends CommandRequest {
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

export type CampaignCommandRequest =
	| CreateCampaignRequest
	| UpdateCampaignRequest;

function validateCampaignCommandRequest(
	commandRequest: CommandRequest,
): asserts commandRequest is CampaignCommandRequest {
	const { commandType, command } = commandRequest;
	switch (commandType) {
		case 'Create':
			if (!('name' in command) || !command.name) {
				throw new BadRequestError('Campaigns must have a name specified');
			}
			if (typeof command.name !== 'string') {
				throw new BadRequestError(
					`Invalid name specified for campaign: ${command.name}`,
				);
			}
			break;
		case 'Update':
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
				(typeof command.activeMapId !== 'string' ||
					!isUUID(command.activeMapId))
			) {
				throw new BadRequestError(
					`Invalid ID specified for campaign active map: ${command.activeMapId}`,
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
				return await this.Create(commandRequest.command);
			case 'Update':
				return await this.Update(commandRequest.command);
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

		return {
			id,
		};
	};

	// @TODO
	Update: CommandFunction<UpdateCampaign> = async (_command) => {
		// @TODO apply event
		return {
			id: randomUUID(), // @TODO this is just a placeholder -  should return existing aggregate ID
		};
	};
}
