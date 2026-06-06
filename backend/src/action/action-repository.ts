import type { AbilityCheckRepository } from '#ability-check/ability-check-repository.ts';
import type {
	ConditionRec,
	ConditionRepository,
} from '#condition/condition-repository.ts';
import type { INarrationRepository } from '#narration/narration-repository.ts';
import type { AbilityCheckModel } from '#prisma-models/AbilityCheck.ts';
import type { NarrationModel } from '#prisma-models/Narration.ts';
import type { ActionType } from '#shared/data-types.ts';
import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/repository-old.ts';
import type { UUID } from 'crypto';

export interface ActionRec {
	ActionId: UUID;
	TargetId: UUID;
	Name: string;
	Type: ActionType | null;
	NarrationId: UUID | null;
}

export interface ActionRefRec extends ActionRec {
	Narration: NarrationModel | null;
	Conditions: ConditionRec[];
	AbilityChecks: AbilityCheckModel[];
}

export const tableName = 'Action';
export const pkColumn = 'ActionId';

export interface ActionRepositoryConfig {
	abilityCheckRepository: AbilityCheckRepository;
	conditionRepository: ConditionRepository;
	narrationRepository: INarrationRepository;
}

export class ActionRepository extends Repository<ActionRec, ActionRefRec> {
	abilityCheckRepository: AbilityCheckRepository;
	conditionRepository: ConditionRepository;
	narrationRepository: INarrationRepository;

	constructor({
		abilityCheckRepository,
		conditionRepository,
		narrationRepository,
	}: ActionRepositoryConfig) {
		super(tableName, pkColumn);
		this.abilityCheckRepository = abilityCheckRepository;
		this.conditionRepository = conditionRepository;
		this.narrationRepository = narrationRepository;
	}

	override async getById(id: UUID): Promise<ActionRefRec | undefined> {
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
			return await db<ActionRec>(tableName).where('TargetId', targetId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for target ID ${targetId}: ${getMessage(e)}`,
			);
		}
	}
}
