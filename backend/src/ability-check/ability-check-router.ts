import type {
	AbilityCheckCreateInput,
	AbilityCheckModel,
	AbilityCheckUpdateInput,
} from '#prisma-models/AbilityCheck.ts';
import type { BaseStreamRouterOpts } from '#shared/router.ts';
import { BaseStreamRouter } from '#shared/router.ts';
import type {
	AbilityCheckResponse,
	AbilityCheckStub,
} from './ability-check-dtos.ts';
import { toDto, toStub } from './ability-check-mappers.ts';
import type {
	AbilityCheckIncludeAll,
	IAbilityCheckRepository,
} from './ability-check-repository.ts';

export type AbilityCheckRouterOpts = BaseStreamRouterOpts<
	AbilityCheckModel,
	AbilityCheckCreateInput,
	AbilityCheckUpdateInput,
	AbilityCheckIncludeAll,
	IAbilityCheckRepository
>;

export class AbilityCheckRouter extends BaseStreamRouter<
	AbilityCheckModel,
	AbilityCheckCreateInput,
	AbilityCheckUpdateInput,
	AbilityCheckIncludeAll,
	AbilityCheckResponse,
	AbilityCheckStub,
	IAbilityCheckRepository
> {
	constructor({
		app,
		commandBus,
		eventBus,
		eventRepository,
		streamRepository,
		repository,
	}: AbilityCheckRouterOpts) {
		super({
			app,
			commandBus,
			eventBus,
			eventRepository,
			streamRepository,
			repository,
			namespace: 'ability-checks',
			descriptor: 'Ability Check',
			descriptors: 'Ability Checks',
		});
	}

	override toDto(model: AbilityCheckIncludeAll): AbilityCheckResponse {
		return toDto(model);
	}

	override toStub(model: AbilityCheckModel): AbilityCheckStub {
		return toStub(model);
	}

	override get() {
		this.defaultGetById();
	}
}
