import type { AbilityCheckMin } from '#ability-check/ability-check-repository.ts';
import type { ConditionMin } from '#condition/condition-repository.ts';
import { db } from '#db';
import type { NarrationMin } from '#narration/narration-repository.ts';
import type { Models } from '#prisma';
import type { AbilityCheckModel } from '#prisma-models/AbilityCheck.ts';
import type { ActionModel } from '#prisma-models/Action.ts';
import type { ConditionModel } from '#prisma-models/Condition.ts';
import type { IActionTargetModel } from '#prisma-models/IActionTarget.ts';
import type { NarrationModel } from '#prisma-models/Narration.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type ActionMin = Scalars<Models.public_Action>;

export type ActionFull = ActionMin & {
	Narration: NarrationMin | null;
	Conditions: ConditionMin[];
	AbilityChecks: AbilityCheckMin[];
};

export type IActionTargetMin = Scalars<Models.public_IActionTarget> & {
	Actions: ActionMin[];
};

/** @deprecated */
export interface IActionTargetIncludeMin extends IActionTargetModel {
	Actions: ActionModel[];
}

/** @deprecated */
export interface ActionIncludeAll extends ActionModel {
	Narration: NarrationModel | null;
	Conditions: ConditionModel[];
	AbilityChecks: AbilityCheckModel[];
}

export interface IActionRepository
	extends IRepository<ActionMin, ActionMin, ActionMin, ActionFull> {
	getByTargetId(targetId: UUID): Promise<ActionMin[]>;
}

export class ActionRepository
	extends Repository<ActionMin, ActionMin, ActionMin, ActionFull>
	implements IActionRepository
{
	override descriptor = 'Action';

	override async getByIdRaw(actionId: UUID): Promise<ActionMin | null> {
		try {
			return await db.orm.public.Action.first({
				ActionId: actionId,
			});
		} catch (e) {
			throw this.getByIdError(actionId, e);
		}
	}

	override async getById(actionId: UUID): Promise<ActionFull | null> {
		try {
			const action = await db.orm.public.Action.include('AbilityChecks')
				.include('ActionConditions', (actionCondition) =>
					actionCondition.include('Condition'),
				)
				.include('Narration')
				.first({
					ActionId: actionId,
				});
			if (!action) return null;
			return {
				...action,
				Conditions: action.ActionConditions.map((ac) => ac.Condition),
			};
		} catch (e) {
			throw this.getByIdError(actionId, e);
		}
	}

	override async getAll(): Promise<ActionMin[]> {
		try {
			return await db.orm.public.Action.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: ActionMin): Promise<ActionMin> {
		try {
			return await db.orm.public.Action.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	async update(
		actionId: UUID,
		data: Partial<ActionMin>,
	): Promise<ActionMin | null> {
		try {
			return await db.orm.public.Action.where({
				ActionId: actionId,
			}).update(data);
		} catch (e) {
			throw this.updateError(actionId, e);
		}
	}

	/**
	 * Retrieves action records from the database for a given target ID
	 * @param id UUID of the target to get actions for
	 * @returns The list of actions (empty array if none found)
	 */
	async getByTargetId(targetId: UUID): Promise<ActionMin[]> {
		try {
			return await db.orm.public.Action.where({
				TargetId: targetId,
			}).all();
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records for Target ID ${targetId}: ${getMessage(e)}`,
			);
		}
	}
}
