import { BaseStreamRouter, type BaseStreamRouterOpts } from '#shared/router.ts';
import type { CampaignResponse, CampaignStub } from './campaign-dtos.ts';
import { toDto, toStub } from './campaign-mappers.ts';
import type {
	CampaignFull,
	CampaignMin,
	ICampaignRepository,
} from './campaign-repository.ts';

export type CampaignRouterOpts = BaseStreamRouterOpts<
	CampaignMin,
	CampaignMin,
	CampaignMin,
	CampaignFull,
	ICampaignRepository
>;

export class CampaignRouter extends BaseStreamRouter<
	CampaignMin,
	CampaignMin,
	CampaignMin,
	CampaignFull,
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

	override toDto = toDto;

	override toStub = toStub;

	override get(): void {
		this.defaultGetById();
		this.defaultGetAll();
	}
}
