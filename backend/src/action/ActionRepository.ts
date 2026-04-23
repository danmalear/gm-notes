import type { AbilityCheckRepository } from '#ability-check/AbilityCheckRepository.ts';
import type { ConditionRepository } from '#condition/ConditionRepository.ts';
import type { NarrationRepository } from '#narration/NarrationRepository.ts';
import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { pkColumn, tableName, type ActionRaw } from './Action.ts';

export class ActionRepository extends Repository<ActionRaw, ActionRaw> {
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

	override async getById(id: UUID): Promise<ActionRaw | undefined> {
		return await this.getByIdRaw(id);
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
