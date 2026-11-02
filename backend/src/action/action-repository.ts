import type { AbilityCheckMin } from '#ability-check/ability-check-repository.ts';
import type { ConditionMin } from '#condition/condition-repository.ts';
import { db } from '#db';
import type { NarrationMin } from '#narration/narration-repository.ts';
import type { Models } from '#prisma';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type ActionRaw = Scalars<Models.public_Action>;

export type ActionMin = ActionRaw;

export type ActionFull = ActionMin & {
	Narration: NarrationMin | null;
	Conditions: ConditionMin[];
	AbilityChecks: AbilityCheckMin[];
};

export type IActionTargetMin = Scalars<Models.public_IActionTarget> & {
	Actions: ActionMin[];
};

export interface IActionRepository extends IRepository<
	ActionRaw,
	ActionMin,
	ActionFull
> {
	getByTargetId(targetId: UUID): Promise<ActionMin[]>;
}

export class ActionRepository
	extends Repository<ActionRaw, ActionMin, ActionFull>
	implements IActionRepository
{
	override descriptor = 'Action';

	override async getByIdMin(actionId: UUID): Promise<ActionMin | null> {
		try {
			return await db.orm.public.Action.first({
				ActionId: actionId,
			});
		} catch (e) {
			throw this.getByIdError(actionId, e);
		}
	}

	override async getByIdFull(actionId: UUID): Promise<ActionFull | null> {
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

	override async create(data: ActionRaw): Promise<ActionMin> {
		try {
			return await db.orm.public.Action.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	async update(
		actionId: UUID,
		data: Partial<ActionRaw>,
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
