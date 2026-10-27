import { db } from '#db';
import type { Models } from '#prisma';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type NarrationMin = Scalars<Models.public_Narration>;

export interface INarrationRepository
	extends IRepository<NarrationMin, NarrationMin, NarrationMin> {
	getByRegionId(regionId: UUID): Promise<NarrationMin[]>;
}

export class NarrationRepository
	extends Repository<NarrationMin, NarrationMin, NarrationMin>
	implements INarrationRepository
{
	override descriptor = 'Narration';

	override async getByIdRaw(narrationId: UUID): Promise<NarrationMin | null> {
		try {
			return await db.orm.public.Narration.first({
				NarrationId: narrationId,
			});
		} catch (e) {
			throw this.getByIdError(narrationId, e);
		}
	}

	override async getById(narrationId: UUID): Promise<NarrationMin | null> {
		return await this.getByIdRaw(narrationId);
	}

	override async getAll(): Promise<NarrationMin[]> {
		try {
			return await db.orm.public.Narration.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: NarrationMin): Promise<NarrationMin> {
		try {
			return await db.orm.public.Narration.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		narrationId: UUID,
		data: Partial<NarrationMin>,
	): Promise<NarrationMin | null> {
		try {
			return await db.orm.public.Narration.where({
				NarrationId: narrationId,
			}).update(data);
		} catch (e) {
			throw this.updateError(narrationId, e);
		}
	}

	/**
	 * Retrieves narration records from the database for a given region ID
	 * @param id UUID of the region to get narrations for
	 * @returns The list of narrations (empty array if none found)
	 */
	async getByRegionId(regionId: UUID): Promise<NarrationMin[]> {
		try {
			return await db.orm.public.Narration.include(
				'RegionNarrations',
				(regionNarration) =>
					regionNarration.where({
						RegionId: regionId,
					}),
			).all();
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Region ID ${regionId}: ${getMessage(e)}`,
			);
		}
	}
}
