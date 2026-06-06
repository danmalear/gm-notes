import type {
	NarrationCreateInput,
	NarrationDelegate,
	NarrationModel,
	NarrationUpdateInput,
	NarrationWhereInput,
	NarrationWhereUniqueInput,
} from '#prisma-models/Narration.ts';
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
	extends Repository<
		NarrationModel,
		NarrationCreateInput,
		NarrationUpdateInput,
		NarrationWhereUniqueInput,
		NarrationWhereInput,
		NarrationDelegate
	>
	implements INarrationRepository
{
	override descriptor = 'Narration';
	override delegate = this.prisma.narration;

	async getByIdRaw(narrationId: UUID): Promise<NarrationModel | null> {
		return await this.$getOne({
			where: {
				NarrationId: narrationId,
			},
		});
	}

	async getById(narrationId: UUID): Promise<NarrationModel | null> {
		return await this.getByIdRaw(narrationId);
	}

	async update(
		narrationId: UUID,
		data: NarrationUpdateInput,
	): Promise<NarrationModel> {
		return this.$update({
			where: {
				NarrationId: narrationId,
			},
			data,
		});
	}

	/**
	 * Retrieves narration records from the database for a given region ID
	 * @param id UUID of the region to get narrations for
	 * @returns The list of narrations (empty array if none found)
	 */
	async getByRegionId(regionId: UUID) {
		return this.$getMany({
			where: {
				RegionNarrations: {
					some: {
						RegionId: regionId,
					},
				},
			},
		});
	}
}
