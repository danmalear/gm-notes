import type { AbilityCheckRepository } from '#ability-check/AbilityCheckRepository.ts';
import type { ConditionRepository } from '#condition/ConditionRepository.ts';
import type { NarrationRepository } from '#narration/NarrationRepository.ts';
import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import type { Action } from './Action.ts';
import { pkColumn, tableName, type ActionRaw } from './Action.ts';

export class ActionRepository extends Repository<ActionRaw, Action> {
	abilityCheckRepository: AbilityCheckRepository;
	conditionRepository: ConditionRepository;
	narrationRepository: NarrationRepository;

	constructor(
		abilityCheckRepository: AbilityCheckRepository,
		conditionRepository: ConditionRepository,
		narrationRepository: NarrationRepository,
	) {
		super(tableName, pkColumn);
		this.abilityCheckRepository = abilityCheckRepository;
		this.conditionRepository = conditionRepository;
		this.narrationRepository = narrationRepository;
	}

	override async getById(id: UUID): Promise<Action | undefined> {
		const actionRaw = await this.getByIdRaw(id);
		if (!actionRaw) return undefined;
		const narration = actionRaw.NarrationId
			? ((await this.narrationRepository.getById(actionRaw.NarrationId)) ??
				null)
			: null;
		const conditions = await this.conditionRepository.getByActionId(id);
		const abilityChecks = await this.abilityCheckRepository.getByActionId(id);

		return {
			...actionRaw,
			Narration: narration,
			Conditions: conditions,
			AbilityChecks: abilityChecks,
		};
	}

	/**
	 * Retrieves action records from the database for a given target ID
	 * @param id UUID of the target to get actions for
	 * @returns The list of actions (empty array if none found)
	 */
	async getByTargetId(targetId: UUID) {
		try {
			return await db<ActionRaw>(tableName).where('TargetId', targetId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for target ID ${targetId}: ${getMessage(e)}`,
			);
		}
	}
}
