import type {
	CampaignCreateInput,
	CampaignInclude,
	CampaignModel,
	CampaignUpdateInput,
} from '#prisma-models/Campaign.ts';
import type { MapModel } from '#prisma-models/Map.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export interface CampaignIncludeAll extends CampaignModel {
	Maps: MapModel[];
}

export const includeAll = {
	Maps: true,
} satisfies CampaignInclude;

export type ICampaignRepository = IRepository<
	CampaignModel,
	CampaignCreateInput,
	CampaignUpdateInput,
	CampaignIncludeAll
>;

export class CampaignRepository
	extends Repository<
		CampaignModel,
		CampaignCreateInput,
		CampaignUpdateInput,
		CampaignIncludeAll
	>
	implements ICampaignRepository
{
	override descriptor = 'Campaign';

	override async getByIdRaw(campaignId: UUID): Promise<CampaignModel | null> {
		try {
			return await this.prisma.campaign.findUnique({
				where: {
					CampaignId: campaignId,
				},
			});
		} catch (e) {
			throw this.getByIdError(campaignId, e);
		}
	}

	override async getById(campaignId: UUID): Promise<CampaignIncludeAll | null> {
		try {
			return await this.prisma.campaign.findUnique({
				where: {
					CampaignId: campaignId,
				},
				include: includeAll,
			});
		} catch (e) {
			throw this.getByIdError(campaignId, e);
		}
	}

	override async getAll(): Promise<CampaignModel[]> {
		try {
			return await this.prisma.campaign.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: CampaignCreateInput): Promise<CampaignModel> {
		try {
			return await this.prisma.campaign.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		campaignId: UUID,
		data: CampaignUpdateInput,
	): Promise<CampaignModel> {
		try {
			return await this.prisma.campaign.update({
				where: {
					CampaignId: campaignId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(campaignId, e);
		}
	}
}
