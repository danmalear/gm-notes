import { db } from '#db';
import type { Models } from '#prisma';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type RegionShapeMin = Scalars<Models.public_RegionShape>;

export interface IRegionShapeRepository
	extends IRepository<RegionShapeMin, RegionShapeMin, RegionShapeMin> {
	getByRegionId(regionId: UUID): Promise<RegionShapeMin[]>;
}

export class RegionShapeRepository
	extends Repository<RegionShapeMin, RegionShapeMin, RegionShapeMin>
	implements IRegionShapeRepository
{
	override descriptor = 'Region Shape';

	override async getByIdRaw(
		regionShapeId: UUID,
	): Promise<RegionShapeMin | null> {
		try {
			return await db.orm.public.RegionShape.first({
				RegionShapeId: regionShapeId,
			});
		} catch (e) {
			throw this.getByIdError(regionShapeId, e);
		}
	}

	override async getById(regionShapeId: UUID): Promise<RegionShapeMin | null> {
		return await this.getByIdRaw(regionShapeId);
	}

	override async getAll(): Promise<RegionShapeMin[]> {
		try {
			return await db.orm.public.RegionShape.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: RegionShapeMin): Promise<RegionShapeMin> {
		try {
			return await db.orm.public.RegionShape.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		regionShapeId: UUID,
		data: Partial<RegionShapeMin>,
	): Promise<RegionShapeMin | null> {
		try {
			return await db.orm.public.RegionShape.where({
				RegionShapeId: regionShapeId,
			}).update(data);
		} catch (e) {
			throw this.updateError(regionShapeId, e);
		}
	}

	/**
	 * Retrieves region shape records from the database for a given region ID
	 * @param regionId UUID of the region to get shapes for
	 * @returns The list of region shapes (empty array if none found)
	 */
	async getByRegionId(regionId: UUID): Promise<RegionShapeMin[]> {
		try {
			const regionShapes = await db.orm.public.RegionShape.where({
				RegionId: regionId,
			}).all();
			return regionShapes;
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Region ID ${regionId}: ${getMessage(e)}`,
			);
		}
	}
}
