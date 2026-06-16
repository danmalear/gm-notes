import type { AbilityCheckModel } from '#prisma-models/AbilityCheck.ts';
import type {
	ActionCreateInput,
	ActionInclude,
	ActionModel,
	ActionUpdateInput,
} from '#prisma-models/Action.ts';
import type { ConditionModel } from '#prisma-models/Condition.ts';
import type { NarrationModel } from '#prisma-models/Narration.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export interface ActionIncludeAll extends ActionModel {
	Narration: NarrationModel | null;
	Conditions: ConditionModel[];
	AbilityChecks: AbilityCheckModel[];
}

export interface IActionRepository
	extends IRepository<
		ActionModel,
		ActionCreateInput,
		ActionUpdateInput,
		ActionIncludeAll
	> {
	getByTargetId(targetId: UUID): Promise<ActionModel[]>;
}

export class ActionRepository extends Repository<
	ActionModel,
	ActionCreateInput,
	ActionUpdateInput,
	ActionIncludeAll
> {
	override descriptor = 'Action';

	override async getByIdRaw(actionId: UUID): Promise<ActionModel | null> {
		try {
			return await this.prisma.action.findUnique({
				where: {
					ActionId: actionId,
				},
			});
		} catch (e) {
			throw this.getByIdError(actionId, e);
		}
	}

	override async getById(actionId: UUID): Promise<ActionIncludeAll | null> {
		try {
			const include = {
				AbilityChecks: true,
				ActionConditions: {
					include: {
						Condition: true,
					},
				},
				Narration: true,
			} satisfies ActionInclude;
			const action = await this.prisma.action.findUnique({
				where: {
					ActionId: actionId,
				},
				include,
			});
			if (!action) return null;
			return {
				...action,
				Conditions: action?.ActionConditions.map((ac) => ac.Condition),
			};
		} catch (e) {
			throw this.getByIdError(actionId, e);
		}
	}

	override async getAll(): Promise<ActionModel[]> {
		try {
			return await this.prisma.action.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: ActionCreateInput): Promise<ActionModel> {
		try {
			return await this.prisma.action.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	async update(actionId: UUID, data: ActionUpdateInput): Promise<ActionModel> {
		try {
			return await this.prisma.action.update({
				where: {
					ActionId: actionId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(actionId, e);
		}
	}

	/**
	 * Retrieves action records from the database for a given target ID
	 * @param id UUID of the target to get actions for
	 * @returns The list of actions (empty array if none found)
	 */
	async getByTargetId(targetId: UUID) {
		try {
			return await this.prisma.action.findMany({
				where: {
					TargetId: targetId,
				},
			});
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records for Target ID ${targetId}: ${getMessage(e)}`,
			);
		}
	}
}
