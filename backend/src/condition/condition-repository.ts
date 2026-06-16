import type {
	ConditionCreateInput,
	ConditionModel,
	ConditionUpdateInput,
} from '#prisma-models/Condition.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export interface IConditionRepository
	extends IRepository<
		ConditionModel,
		ConditionCreateInput,
		ConditionUpdateInput
	> {
	getByActionId(actionId: UUID): Promise<ConditionModel[]>;
}

export class ConditionRepository
	extends Repository<ConditionModel, ConditionCreateInput, ConditionUpdateInput>
	implements IConditionRepository
{
	override descriptor = 'Condition';

	override async getByIdRaw(conditionId: UUID): Promise<ConditionModel | null> {
		try {
			return await this.prisma.condition.findUnique({
				where: {
					ConditionId: conditionId,
				},
			});
		} catch (e) {
			throw this.getByIdError(conditionId, e);
		}
	}

	override async getById(id: UUID): Promise<ConditionModel | null> {
		return await this.getByIdRaw(id);
	}

	override async getAll(): Promise<ConditionModel[]> {
		try {
			return await this.prisma.condition.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: ConditionCreateInput): Promise<ConditionModel> {
		try {
			return await this.prisma.condition.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		conditionId: UUID,
		data: ConditionUpdateInput,
	): Promise<ConditionModel> {
		try {
			return await this.prisma.condition.update({
				where: {
					ConditionId: conditionId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(conditionId, e);
		}
	}

	/**
	 * Retrieves condition records from the database for a given action ID
	 * @param id UUID of the action to get conditions for
	 * @returns The list of conditions (empty array if none found)
	 */
	async getByActionId(actionId: UUID) {
		try {
			const conditions = await this.prisma.condition.findMany({
				where: {
					ActionConditions: {
						some: {
							ActionId: actionId,
						},
					},
				},
			});
			return conditions;
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Action ID ${actionId}: ${getMessage(e)}`,
			);
		}
	}
}
