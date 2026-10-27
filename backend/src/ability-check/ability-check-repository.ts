import { db } from '#db';
import type { NarrationMin } from '#narration/narration-repository.ts';
import type { Models } from '#prisma';
import type { AbilityCheckModel } from '#prisma-models/AbilityCheck.ts';
import type { NarrationModel } from '#prisma-models/Narration.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type AbilityCheckMin = Scalars<Models.public_AbilityCheck>;

export type AbilityCheckFull = AbilityCheckMin & {
	SuccessNarration: NarrationMin | null;
	FailureNarration: NarrationMin | null;
	CriticalSuccessNarration: NarrationMin | null;
	CriticalFailureNarration: NarrationMin | null;
};

export interface AbilityCheckIncludeAll extends AbilityCheckModel {
	SuccessNarration: NarrationModel | null;
	FailureNarration: NarrationModel | null;
	CriticalSuccessNarration: NarrationModel | null;
	CriticalFailureNarration: NarrationModel | null;
}

export interface IAbilityCheckRepository
	extends IRepository<
		AbilityCheckMin,
		AbilityCheckMin,
		AbilityCheckMin,
		AbilityCheckFull
	> {
	getByActionId(actionId: UUID): Promise<AbilityCheckMin[]>;
}

export class AbilityCheckRepository
	extends Repository<
		AbilityCheckMin,
		AbilityCheckMin,
		AbilityCheckMin,
		AbilityCheckFull
	>
	implements IAbilityCheckRepository
{
	override descriptor = 'Ability Check';

	override async getByIdRaw(
		abilityCheckId: UUID,
	): Promise<AbilityCheckMin | null> {
		try {
			return await db.orm.public.AbilityCheck.first({
				AbilityCheckId: abilityCheckId,
			});
		} catch (e) {
			throw this.getByIdError(abilityCheckId, e);
		}
	}

	override async getById(
		abilityCheckId: UUID,
	): Promise<AbilityCheckFull | null> {
		try {
			return await db.orm.public.AbilityCheck.include('SuccessNarration')
				.include('FailureNarration')
				.include('CriticalSuccessNarration')
				.include('CriticalFailureNarration')
				.first({
					AbilityCheckId: abilityCheckId,
				});
		} catch (e) {
			throw this.getByIdError(abilityCheckId, e);
		}
	}

	override async getAll(): Promise<AbilityCheckMin[]> {
		try {
			return await db.orm.public.AbilityCheck.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: AbilityCheckMin): Promise<AbilityCheckMin> {
		try {
			return await db.orm.public.AbilityCheck.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	async update(
		abilityCheckId: UUID,
		data: AbilityCheckMin,
	): Promise<AbilityCheckMin | null> {
		try {
			return await db.orm.public.AbilityCheck.where({
				AbilityCheckId: abilityCheckId,
			}).update(data);
		} catch (e) {
			throw this.updateError(abilityCheckId, e);
		}
	}

	/**
	 * Retrieves ability check records from the database for a given action ID
	 * @param id UUID of the action to get ability checks for
	 * @returns The list of ability checks (empty array if none found)
	 */
	async getByActionId(actionId: UUID): Promise<AbilityCheckMin[]> {
		try {
			return await db.orm.public.AbilityCheck.where({
				ActionId: actionId,
			}).all();
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records for Action ID ${actionId}: ${getMessage(e)}`,
			);
		}
	}
}
