import type { PrismaClient } from '#prisma-client';
import type {
	NarrationCreateInput,
	NarrationModel,
	NarrationUpdateInput,
} from '#prisma-models/Narration.ts';
import { getMessage } from '#shared/error.ts';
import type { IRepository, IRepositoryConfig } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export class NarrationRepository
	implements
		IRepository<NarrationModel, NarrationCreateInput, NarrationUpdateInput>
{
	prisma: PrismaClient;

	constructor({ prisma }: IRepositoryConfig) {
		this.prisma = prisma;
	}

	async getByIdRaw(narrationId: UUID): Promise<NarrationModel | null> {
		try {
			return await this.prisma.narration.findUnique({
				where: {
					NarrationId: narrationId,
				},
			});
		} catch (e) {
			throw new Error(`Error getting Narration by ID: ${getMessage(e)}`);
		}
	}

	async getById(narrationId: UUID): Promise<NarrationModel | null> {
		return await this.getByIdRaw(narrationId);
	}

	async getAll(): Promise<NarrationModel[]> {
		try {
			return await this.prisma.narration.findMany();
		} catch (e) {
			throw new Error(`Error getting all Narration records: ${getMessage(e)}`);
		}
	}

	async insert(data: NarrationCreateInput): Promise<NarrationModel> {
		try {
			return await this.prisma.narration.create({
				data,
			});
		} catch (e) {
			throw new Error(`Error creating new Narration: ${getMessage(e)}`);
		}
	}

	async update(
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
			throw new Error(
				`Error updating Narration with ID ${narrationId}: ${getMessage(e)}`,
			);
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
			throw Error(
				`Error getting Narration records for region ID ${regionId}: ${getMessage(e)}`,
			);
		}
	}
}
