import { db } from '#db';
import type { MapMin } from '#map/map-repository.ts';
import type { Models } from '#prisma';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type CampaignMin = Scalars<Models.public_Campaign>;

export interface CampaignFull extends CampaignMin {
	Maps: MapMin[];
}

export type ICampaignRepository = IRepository<
	CampaignMin,
	CampaignMin,
	CampaignMin,
	CampaignFull
>;

export class CampaignRepository
	extends Repository<CampaignMin, CampaignMin, CampaignMin, CampaignFull>
	implements ICampaignRepository
{
	override descriptor = 'Campaign';

	override async getByIdRaw(campaignId: UUID): Promise<CampaignMin | null> {
		try {
			return await db.orm.public.Campaign.first({
				CampaignId: campaignId,
			});
		} catch (e) {
			throw this.getByIdError(campaignId, e);
		}
	}

	override async getById(campaignId: UUID): Promise<CampaignFull | null> {
		try {
			return await db.orm.public.Campaign.include('Maps').first({
				CampaignId: campaignId,
			});
		} catch (e) {
			throw this.getByIdError(campaignId, e);
		}
	}

	override async getAll(): Promise<CampaignMin[]> {
		try {
			return await db.orm.public.Campaign.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: CampaignMin): Promise<CampaignMin> {
		try {
			return await db.orm.public.Campaign.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		campaignId: UUID,
		data: Partial<CampaignMin>,
	): Promise<CampaignMin | null> {
		try {
			return await db.orm.public.Campaign.where({
				CampaignId: campaignId,
			}).update(data);
		} catch (e) {
			throw this.updateError(campaignId, e);
		}
	}
}
