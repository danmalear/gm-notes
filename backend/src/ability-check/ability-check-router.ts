import { BaseStreamRouter, type BaseStreamRouterOpts } from '#shared/router.ts';
import type {
	AbilityCheckResponse,
	AbilityCheckStub,
} from './ability-check-dtos.ts';
import { toDto, toStub } from './ability-check-mappers.ts';
import type {
	AbilityCheckFull,
	AbilityCheckMin,
	AbilityCheckRaw,
	IAbilityCheckRepository,
} from './ability-check-repository.ts';

export type AbilityCheckRouterOpts = BaseStreamRouterOpts<
	AbilityCheckRaw,
	AbilityCheckMin,
	AbilityCheckFull,
	IAbilityCheckRepository
>;

export class AbilityCheckRouter extends BaseStreamRouter<
	AbilityCheckRaw,
	AbilityCheckMin,
	AbilityCheckFull,
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

	override toDto = toDto;

	override toStub = toStub;

	override get() {
		this.defaultGetById();
	}
}
