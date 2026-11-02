import { db } from '#db';
import type { Models } from '#prisma';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type RegionShapeRaw = Scalars<Models.public_RegionShape>;
export type RegionShapeMin = RegionShapeRaw;
export type RegionShapeFull = RegionShapeMin;

export interface IRegionShapeRepository extends IRepository<
	RegionShapeRaw,
	RegionShapeMin,
	RegionShapeFull
> {
	getByRegionId(regionId: UUID): Promise<RegionShapeMin[]>;
}

export class RegionShapeRepository
	extends Repository<RegionShapeRaw, RegionShapeMin, RegionShapeFull>
	implements IRegionShapeRepository
{
	override descriptor = 'Region Shape';

	override async getByIdMin(
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

	override async getByIdFull(
		regionShapeId: UUID,
	): Promise<RegionShapeFull | null> {
		return await this.getByIdMin(regionShapeId);
	}

	override async getAll(): Promise<RegionShapeMin[]> {
		try {
			return await db.orm.public.RegionShape.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: RegionShapeRaw): Promise<RegionShapeMin> {
		try {
			return await db.orm.public.RegionShape.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		regionShapeId: UUID,
		data: Partial<RegionShapeRaw>,
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
