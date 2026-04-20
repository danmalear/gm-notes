import type { CommandRequestBase } from '#command/command-types.ts';
import { CommandRouter } from '#command/CommandRouter.ts';
import { DomainCommands } from '#command/DomainCommands.ts';
import { BadRequestError } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import { randomUUID, type UUID } from 'crypto';
import type { Campaign } from './Campaign.ts';
import { CampaignRepository } from './CampaignRepository.ts';

interface CampaignRequest extends CommandRequestBase {
	domain: 'Campaign';
}

export interface CreateCampaign {
	name: string;
}

export interface CreateCampaignRequest extends CampaignRequest {
	commandType: 'Create';
	command: CreateCampaign;
}

export interface UpdateCampaign {
	id: UUID;
	name?: string;
	activeMapId?: UUID;
}

export interface UpdateCampaignRequest extends CampaignRequest {
	commandType: 'Update';
	command: UpdateCampaign;
}

export type CampaignCommandRequest =
	| CreateCampaignRequest
	| UpdateCampaignRequest;

export class CampaignCommands extends DomainCommands<
	'Campaign',
	CampaignCommandRequest
> {
	campaignRepository: CampaignRepository;

	commands = {
		Create: this.Create,
		Update: this.Update,
	};

	constructor(commandHandler: CommandRouter) {
		super('Campaign', commandHandler);
		this.campaignRepository = new CampaignRepository();
	}

	async Create(command: CreateCampaign) {
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
	}

	async Update(command: UpdateCampaign) {
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

		return {};
	}
}
