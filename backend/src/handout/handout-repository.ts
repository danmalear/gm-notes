import type {
	HandoutCreateInput,
	HandoutModel,
	HandoutUpdateInput,
} from '#prisma-models/Handout.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export interface IHandoutRepository
	extends IRepository<HandoutModel, HandoutCreateInput, HandoutUpdateInput> {
	getByRegionId(regionId: UUID): Promise<HandoutModel[]>;
}

export class HandoutRepository
	extends Repository<HandoutModel, HandoutCreateInput, HandoutUpdateInput>
	implements IHandoutRepository
{
	override descriptor = 'Handout';

	override async getByIdRaw(handoutId: UUID): Promise<HandoutModel | null> {
		try {
			return await this.prisma.handout.findUnique({
				where: {
					HandoutId: handoutId,
				},
			});
		} catch (e) {
			throw this.getByIdError(handoutId, e);
		}
	}

	override async getById(id: UUID): Promise<HandoutModel | null> {
		return await this.getByIdRaw(id);
	}

	override async getAll(): Promise<HandoutModel[]> {
		try {
			return await this.prisma.handout.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: HandoutCreateInput): Promise<HandoutModel> {
		try {
			return await this.prisma.handout.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		handoutId: UUID,
		data: HandoutUpdateInput,
	): Promise<HandoutModel> {
		try {
			return await this.prisma.handout.update({
				where: {
					HandoutId: handoutId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(handoutId, e);
		}
	}

	/**
	 * Retrieves handout records from the database for a given region ID
	 * @param id UUID of the region to get handouts for
	 * @returns The list of handouts (empty array if none found)
	 */
	async getByRegionId(regionId: UUID): Promise<HandoutModel[]> {
		try {
			return await this.prisma.handout.findMany({
				where: {
					RegionHandouts: {
						some: {
							RegionId: regionId,
						},
					},
				},
			});
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Region ID ${regionId}: ${getMessage(e)}`,
			);
		}
	}
}
