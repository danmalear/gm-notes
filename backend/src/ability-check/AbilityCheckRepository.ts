import type { NarrationRepository } from '#narration/NarrationRepository.ts';
import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import {
	pkColumn,
	tableName,
	type AbilityCheck,
	type AbilityCheckRaw,
} from './AbilityCheck.ts';

export class AbilityCheckRepository extends Repository<
	AbilityCheckRaw,
	AbilityCheck
> {
	narrationRepository: NarrationRepository;

	constructor(narrationRepository: NarrationRepository) {
		super(tableName, pkColumn);
		this.narrationRepository = narrationRepository;
	}

	override async getById(id: UUID): Promise<AbilityCheck | undefined> {
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
			return await db<AbilityCheckRaw>(tableName).where('ActionId', actionId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for action ID ${actionId}: ${getMessage(e)}`,
			);
		}
	}
}
