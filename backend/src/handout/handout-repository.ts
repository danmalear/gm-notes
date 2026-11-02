import { db } from '#db';
import type { Models } from '#prisma';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type HandoutRaw = Scalars<Models.public_Handout>;
export type HandoutMin = HandoutRaw;
export type HandoutFull = HandoutMin;

export interface IHandoutRepository extends IRepository<
	HandoutRaw,
	HandoutMin,
	HandoutFull
> {
	getByRegionId(regionId: UUID): Promise<HandoutMin[]>;
}

export class HandoutRepository
	extends Repository<HandoutRaw, HandoutMin, HandoutFull>
	implements IHandoutRepository
{
	override descriptor = 'Handout';

	override async getByIdMin(handoutId: UUID): Promise<HandoutMin | null> {
		try {
			return await db.orm.public.Handout.first({
				HandoutId: handoutId,
			});
		} catch (e) {
			throw this.getByIdError(handoutId, e);
		}
	}

	override async getByIdFull(id: UUID): Promise<HandoutFull | null> {
		return await this.getByIdMin(id);
	}

	override async getAll(): Promise<HandoutMin[]> {
		try {
			return await db.orm.public.Handout.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: HandoutRaw): Promise<HandoutMin> {
		try {
			return await db.orm.public.Handout.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		handoutId: UUID,
		data: Partial<HandoutRaw>,
	): Promise<HandoutMin | null> {
		try {
			return await db.orm.public.Handout.where({
				HandoutId: handoutId,
			}).update(data);
		} catch (e) {
			throw this.updateError(handoutId, e);
		}
	}

	/**
	 * Retrieves handout records from the database for a given region ID
	 * @param id UUID of the region to get handouts for
	 * @returns The list of handouts (empty array if none found)
	 */
	async getByRegionId(regionId: UUID): Promise<HandoutMin[]> {
		try {
			return await db.orm.public.Handout.include(
				'RegionHandouts',
				(regionHandout) =>
					regionHandout.where({
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
