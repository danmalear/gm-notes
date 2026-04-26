import type {
	NarrationRec,
	NarrationRepository,
} from '#narration/narration-repository.ts';
import type { Skill } from '#shared/data-types.ts';
import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';

export interface AbilityCheckRec {
	AbilityCheckId: UUID;
	ActionId: UUID;
	Skill: Skill;
	DC: number;
	SuccessNarrationId: UUID | null;
	FailureNarrationId: UUID | null;
	CriticalSuccessNarrationId: UUID | null;
	CriticalFailureNarrationId: UUID | null;
}

export interface AbilityCheckRefRec extends AbilityCheckRec {
	SuccessNarration: NarrationRec | null;
	FailureNarration: NarrationRec | null;
	CriticalSuccessNarration: NarrationRec | null;
	CriticalFailureNarration: NarrationRec | null;
}

export const tableName = 'AbilityCheck';
export const pkColumn = 'AbilityCheckId';

export class AbilityCheckRepository extends Repository<
	AbilityCheckRec,
	AbilityCheckRefRec
> {
	narrationRepository: NarrationRepository;

	constructor(narrationRepository: NarrationRepository) {
		super(tableName, pkColumn);
		this.narrationRepository = narrationRepository;
	}

	override async getById(id: UUID): Promise<AbilityCheckRefRec | undefined> {
		const abilityCheck = await this.getByIdRaw(id);
		if (!abilityCheck) return undefined;

		const successNarration = abilityCheck.SuccessNarrationId
			? ((await this.narrationRepository.getById(
					abilityCheck.SuccessNarrationId,
				)) ?? null)
			: null;
		const criticalSuccessNarration = abilityCheck.CriticalSuccessNarrationId
			? ((await this.narrationRepository.getById(
					abilityCheck.CriticalSuccessNarrationId,
				)) ?? null)
			: null;
		const failureNarration = abilityCheck.FailureNarrationId
			? ((await this.narrationRepository.getById(
					abilityCheck.FailureNarrationId,
				)) ?? null)
			: null;
		const criticalFailureNarration = abilityCheck.CriticalFailureNarrationId
			? ((await this.narrationRepository.getById(
					abilityCheck.CriticalFailureNarrationId,
				)) ?? null)
			: null;

		return {
			...abilityCheck,
			SuccessNarration: successNarration,
			CriticalSuccessNarration: criticalSuccessNarration,
			FailureNarration: failureNarration,
			CriticalFailureNarration: criticalFailureNarration,
		};
	}

	/**
	 * Retrieves ability check records from the database for a given action ID
	 * @param id UUID of the action to get ability checks for
	 * @returns The list of ability checks (empty array if none found)
	 */
	async getByActionId(actionId: UUID) {
		try {
			return await db<AbilityCheckRec>(tableName).where('ActionId', actionId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for action ID ${actionId}: ${getMessage(e)}`,
			);
		}
	}
}
