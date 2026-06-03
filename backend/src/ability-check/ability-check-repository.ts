import type { PrismaClient } from '#prisma-client';
import type {
	AbilityCheckCreateInput,
	AbilityCheckInclude,
	AbilityCheckModel,
	AbilityCheckUpdateInput,
} from '#prisma-models/AbilityCheck.ts';
import type { NarrationModel } from '#prisma-models/Narration.ts';
import { getMessage } from '#shared/error.ts';
import type { IRepository, IRepositoryConfig } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export interface AbilityCheckIncludeAll extends AbilityCheckModel {
	SuccessNarration: NarrationModel | null;
	FailureNarration: NarrationModel | null;
	CriticalSuccessNarration: NarrationModel | null;
	CriticalFailureNarration: NarrationModel | null;
}

export class AbilityCheckRepository
	implements
		IRepository<
			AbilityCheckModel,
			AbilityCheckCreateInput,
			AbilityCheckUpdateInput,
			AbilityCheckIncludeAll
		>
{
	prisma: PrismaClient;

	constructor({ prisma }: IRepositoryConfig) {
		this.prisma = prisma;
	}

	async getByIdRaw(abilityCheckId: UUID): Promise<AbilityCheckModel | null> {
		try {
			return await this.prisma.abilityCheck.findUnique({
				where: {
					AbilityCheckId: abilityCheckId,
				},
			});
		} catch (e) {
			throw new Error(`Error getting Ability Check by ID: ${getMessage(e)}`);
		}
	}

	async getById(abilityCheckId: UUID) {
		try {
			const includeNarrations = {
				SuccessNarration: true,
				FailureNarration: true,
				CriticalSuccessNarration: true,
				CriticalFailureNarration: true,
			} satisfies AbilityCheckInclude;
			return await this.prisma.abilityCheck.findUnique({
				where: {
					AbilityCheckId: abilityCheckId,
				},
				include: includeNarrations,
			});
		} catch (e) {
			throw new Error(`Error getting Ability Check by ID: ${getMessage(e)}`);
		}
	}

	async getAll(): Promise<AbilityCheckModel[]> {
		try {
			return await this.prisma.abilityCheck.findMany();
		} catch (e) {
			throw new Error(
				`Error getting all Ability Check records: ${getMessage(e)}`,
			);
		}
	}

	async insert(data: AbilityCheckCreateInput): Promise<AbilityCheckModel> {
		try {
			return await this.prisma.abilityCheck.create({
				data,
			});
		} catch (e) {
			throw new Error(`Error creating new Ability Check: ${getMessage(e)}`);
		}
	}

	async update(
		abilityCheckId: UUID,
		data: AbilityCheckUpdateInput,
	): Promise<AbilityCheckModel> {
		try {
			return await this.prisma.abilityCheck.update({
				where: {
					AbilityCheckId: abilityCheckId,
				},
				data,
			});
		} catch (e) {
			throw new Error(
				`Error updating Ability Check with ID ${abilityCheckId}: ${getMessage(e)}`,
			);
		}
	}

	/**
	 * Retrieves ability check records from the database for a given action ID
	 * @param id UUID of the action to get ability checks for
	 * @returns The list of ability checks (empty array if none found)
	 */
	async getByActionId(actionId: UUID) {
		try {
			return await this.prisma.abilityCheck.findMany({
				where: {
					ActionId: actionId,
				},
			});
		} catch (e) {
			throw new Error(
				`Error getting Ability Check records for action ID ${actionId}: ${getMessage(e)}`,
			);
		}
	}
}
