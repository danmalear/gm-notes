import { db } from '#db';
import type { Models } from '#prisma';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type ConditionRaw = Scalars<Models.public_Condition>;
export type ConditionMin = ConditionRaw;
export type ConditionFull = ConditionMin;

export interface IConditionRepository extends IRepository<
	ConditionRaw,
	ConditionMin,
	ConditionFull
> {
	getByActionId(actionId: UUID): Promise<ConditionMin[]>;
}

export class ConditionRepository
	extends Repository<ConditionRaw, ConditionMin, ConditionFull>
	implements IConditionRepository
{
	override descriptor = 'Condition';

	override async getByIdMin(conditionId: UUID): Promise<ConditionMin | null> {
		try {
			return await db.orm.public.Condition.first({
				ConditionId: conditionId,
			});
		} catch (e) {
			throw this.getByIdError(conditionId, e);
		}
	}

	override async getByIdFull(id: UUID): Promise<ConditionFull | null> {
		return await this.getByIdMin(id);
	}

	override async getAll(): Promise<ConditionMin[]> {
		try {
			return await db.orm.public.Condition.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: ConditionRaw): Promise<ConditionMin> {
		try {
			return await db.orm.public.Condition.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		conditionId: UUID,
		data: Partial<ConditionRaw>,
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
