import type {
	CampaignCreateInput,
	CampaignModel,
	CampaignUpdateInput,
} from '#prisma-models/Campaign.ts';
import { BaseStreamRouter, type BaseStreamRouterOpts } from '#shared/router.ts';
import type { CampaignResponse, CampaignStub } from './campaign-dtos.ts';
import { toDto, toStub } from './campaign-mappers.ts';
import type {
	CampaignIncludeAll,
	ICampaignRepository,
} from './campaign-repository.ts';

export type CampaignRouterOpts = BaseStreamRouterOpts<
	CampaignModel,
	CampaignCreateInput,
	CampaignUpdateInput,
	CampaignIncludeAll,
	ICampaignRepository
>;

export class CampaignRouter extends BaseStreamRouter<
	CampaignModel,
	CampaignCreateInput,
	CampaignUpdateInput,
	CampaignIncludeAll,
	CampaignResponse,
	CampaignStub,
	ICampaignRepository
> {
	constructor({
		app,
		commandBus,
		eventBus,
		eventRepository,
		streamRepository,
		repository,
	}: CampaignRouterOpts) {
		super({
			app,
			commandBus,
			eventBus,
			eventRepository,
			streamRepository,
			repository,
			namespace: 'campaigns',
			descriptor: 'Campaign',
			descriptors: 'Campaigns',
		});
	}

	override toDto(model: CampaignIncludeAll): CampaignResponse {
		return toDto(model);
	}

	override toStub(model: CampaignModel): CampaignStub {
		return toStub(model);
	}

	override get(): void {
		this.defaultGetById();
		this.defaultGetAll();
	}
}
