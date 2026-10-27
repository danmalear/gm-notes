import { db } from '#db';
import type { Models } from '#prisma';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export type ConditionMin = Omit<
	Omit<Models.public_Condition, 'ActionConditions'>,
	'Campaign'
>;

export interface IConditionRepository
	extends IRepository<ConditionMin, ConditionMin, ConditionMin> {
	getByActionId(actionId: UUID): Promise<ConditionMin[]>;
}

export class ConditionRepository
	extends Repository<ConditionMin, ConditionMin, ConditionMin>
	implements IConditionRepository
{
	override descriptor = 'Condition';

	override async getByIdRaw(conditionId: UUID): Promise<ConditionMin | null> {
		try {
			return await db.orm.public.Condition.first({
				ConditionId: conditionId,
			});
		} catch (e) {
			throw this.getByIdError(conditionId, e);
		}
	}

	override async getById(id: UUID): Promise<ConditionMin | null> {
		return await this.getByIdRaw(id);
	}

	override async getAll(): Promise<ConditionMin[]> {
		try {
			return await db.orm.public.Condition.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: ConditionMin): Promise<ConditionMin> {
		try {
			return await db.orm.public.Condition.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		conditionId: UUID,
		data: ConditionMin,
	): Promise<ConditionMin | null> {
		try {
			return await db.orm.public.Condition.where({
				ConditionId: conditionId,
			}).update(data);
		} catch (e) {
			throw this.updateError(conditionId, e);
		}
	}

	/**
	 * Retrieves condition records from the database for a given action ID
	 * @param id UUID of the action to get conditions for
	 * @returns The list of conditions (empty array if none found)
	 */
	async getByActionId(actionId: UUID): Promise<ConditionMin[]> {
		try {
			const conditions = await db.orm.public.Condition.include(
				'ActionConditions',
				(actionCondition) =>
					actionCondition.where({
						ActionId: actionId,
					}),
			).all();
			return conditions;
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Action ID ${actionId}: ${getMessage(e)}`,
			);
		}
	}
}
