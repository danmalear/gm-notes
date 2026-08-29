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
import type { IAbilityCheckRepository } from './ability-check-repository.ts';

export type AbilityCheckRouterOpts = BaseStreamRouterOpts<
	AbilityCheckModel,
	AbilityCheckCreateInput,
	AbilityCheckUpdateInput,
	AbilityCheckModel,
	IAbilityCheckRepository
>;

export class AbilityCheckRouter extends BaseStreamRouter<
	AbilityCheckModel,
	AbilityCheckCreateInput,
	AbilityCheckUpdateInput,
	AbilityCheckModel,
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

	override get() {
		this.defaultGetById();
	}
}
