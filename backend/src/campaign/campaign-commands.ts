import { randomUUID, type UUID } from 'crypto';
import type { CommandClass, CommandRequestBase } from '../dtos/command.ts';
import { BadRequestError } from '../helpers/error.ts';
import { isUUID } from '../helpers/uuid.ts';
import type { Campaign } from './Campaign.ts';
import { CampaignRepository } from './CampaignRepository.ts';

export interface CreateCampaign {
	name: string;
}

export interface CreateCampaignRequest extends CommandRequestBase {
	commandType: 'Campaign/Create';
	command: CreateCampaign;
	response: {
		id: UUID;
	};
}

export interface UpdateCampaign {
	id: UUID;
	name?: string;
	activeMapId?: UUID;
}

export interface UpdateCampaignRequest extends CommandRequestBase {
	commandType: 'Campaign/Update';
	command: UpdateCampaign;
	response: Record<string, never>;
}

export type CampaignCommandRequest =
	| CreateCampaignRequest
	| UpdateCampaignRequest;

export class CampaignCommands implements CommandClass<CampaignCommandRequest> {
	campaignRepository: CampaignRepository;

	constructor() {
		this.campaignRepository = new CampaignRepository();
	}

	async 'Campaign/Create'(command: CreateCampaign) {
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

	async 'Campaign/Update'(command: UpdateCampaign) {
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
