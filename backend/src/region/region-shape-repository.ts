import type {
	RegionShapeCreateInput,
	RegionShapeModel,
	RegionShapeUpdateInput,
} from '#prisma-models/RegionShape.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export interface IRegionShapeRepository
	extends IRepository<
		RegionShapeModel,
		RegionShapeCreateInput,
		RegionShapeUpdateInput
	> {
	getByRegionId(regionId: UUID): Promise<RegionShapeModel[]>;
}

export class RegionShapeRepository
	extends Repository<
		RegionShapeModel,
		RegionShapeCreateInput,
		RegionShapeUpdateInput
	>
	implements IRegionShapeRepository
{
	override descriptor = 'Region Shape';

	override async getByIdRaw(
		regionShapeId: UUID,
	): Promise<RegionShapeModel | null> {
		try {
			return await this.prisma.regionShape.findUnique({
				where: {
					RegionShapeId: regionShapeId,
				},
			});
		} catch (e) {
			throw this.getByIdError(regionShapeId, e);
		}
	}

	override async getById(
		regionShapeId: UUID,
	): Promise<RegionShapeModel | null> {
		return await this.getByIdRaw(regionShapeId);
	}

	override async getAll(): Promise<RegionShapeModel[]> {
		try {
			return await this.prisma.regionShape.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(
		data: RegionShapeCreateInput,
	): Promise<RegionShapeModel> {
		try {
			return await this.prisma.regionShape.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		regionShapeId: UUID,
		data: RegionShapeUpdateInput,
	): Promise<RegionShapeModel> {
		try {
			return await this.prisma.regionShape.update({
				where: {
					RegionShapeId: regionShapeId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(regionShapeId, e);
		}
	}

	/**
	 * Retrieves region shape records from the database for a given region ID
	 * @param regionId UUID of the region to get shapes for
	 * @returns The list of region shapes (empty array if none found)
	 */
	async getByRegionId(regionId: UUID): Promise<RegionShapeModel[]> {
		try {
			const regionShapes = await this.prisma.regionShape.findMany({
				where: {
					RegionId: regionId,
				},
			});
			return regionShapes;
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Region ID ${regionId}: ${getMessage(e)}`,
			);
		}
	}
}
