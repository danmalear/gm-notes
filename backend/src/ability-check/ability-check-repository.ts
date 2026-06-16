import type {
	AbilityCheckCreateInput,
	AbilityCheckInclude,
	AbilityCheckModel,
	AbilityCheckUpdateInput,
} from '#prisma-models/AbilityCheck.ts';
import type { NarrationModel } from '#prisma-models/Narration.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export interface AbilityCheckIncludeAll extends AbilityCheckModel {
	SuccessNarration: NarrationModel | null;
	FailureNarration: NarrationModel | null;
	CriticalSuccessNarration: NarrationModel | null;
	CriticalFailureNarration: NarrationModel | null;
}

export interface IAbilityCheckRepository
	extends IRepository<
		AbilityCheckModel,
		AbilityCheckCreateInput,
		AbilityCheckUpdateInput,
		AbilityCheckIncludeAll
	> {
	getByActionId(actionId: UUID): Promise<AbilityCheckModel[]>;
}

export class AbilityCheckRepository
	extends Repository<
		AbilityCheckModel,
		AbilityCheckCreateInput,
		AbilityCheckUpdateInput,
		AbilityCheckIncludeAll
	>
	implements IAbilityCheckRepository
{
	override descriptor = 'Ability Check';

	override async getByIdRaw(
		abilityCheckId: UUID,
	): Promise<AbilityCheckModel | null> {
		try {
			return await this.prisma.abilityCheck.findUnique({
				where: {
					AbilityCheckId: abilityCheckId,
				},
			});
		} catch (e) {
			throw this.getByIdError(abilityCheckId, e);
		}
	}

	override async getById(abilityCheckId: UUID) {
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
			throw this.getByIdError(abilityCheckId, e);
		}
	}

	override async getAll(): Promise<AbilityCheckModel[]> {
		try {
			return await this.prisma.abilityCheck.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(
		data: AbilityCheckCreateInput,
	): Promise<AbilityCheckModel> {
		try {
			return await this.prisma.abilityCheck.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
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
			throw this.updateError(abilityCheckId, e);
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
				`Error getting ${this.descriptor} records for Action ID ${actionId}: ${getMessage(e)}`,
			);
		}
	}
}
