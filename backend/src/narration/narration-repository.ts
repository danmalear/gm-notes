import type {
	NarrationCreateInput,
	NarrationModel,
	NarrationUpdateInput,
} from '#prisma-models/Narration.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export interface INarrationRepository
	extends IRepository<
		NarrationModel,
		NarrationCreateInput,
		NarrationUpdateInput
	> {
	getByRegionId(regionId: UUID): Promise<NarrationModel[]>;
}

export class NarrationRepository
	extends Repository<NarrationModel, NarrationCreateInput, NarrationUpdateInput>
	implements INarrationRepository
{
	override descriptor = 'Narration';

	override async getByIdRaw(narrationId: UUID): Promise<NarrationModel | null> {
		try {
			return await this.prisma.narration.findUnique({
				where: {
					NarrationId: narrationId,
				},
			});
		} catch (e) {
			throw this.getByIdError(narrationId, e);
		}
	}

	override async getById(narrationId: UUID): Promise<NarrationModel | null> {
		return await this.getByIdRaw(narrationId);
	}

	override async getAll(): Promise<NarrationModel[]> {
		try {
			return await this.prisma.narration.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: NarrationCreateInput): Promise<NarrationModel> {
		try {
			return await this.prisma.narration.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		narrationId: UUID,
		data: NarrationUpdateInput,
	): Promise<NarrationModel> {
		try {
			return await this.prisma.narration.update({
				where: {
					NarrationId: narrationId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(narrationId, e);
		}
	}

	/**
	 * Retrieves narration records from the database for a given region ID
	 * @param id UUID of the region to get narrations for
	 * @returns The list of narrations (empty array if none found)
	 */
	async getByRegionId(regionId: UUID) {
		try {
			return await this.prisma.narration.findMany({
				where: {
					RegionNarrations: {
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
