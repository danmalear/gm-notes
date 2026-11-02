import { BaseStreamRouter, type BaseStreamRouterOpts } from '#shared/router.ts';
import type { ActionResponse, ActionStub } from './action-dtos.ts';
import { toDto, toStub } from './action-mappers.ts';
import type {
	ActionFull,
	ActionMin,
	ActionRaw,
	IActionRepository,
} from './action-repository.ts';

export type ActionRouterOpts = BaseStreamRouterOpts<
	ActionRaw,
	ActionMin,
	ActionFull,
	IActionRepository
>;

export class ActionRouter extends BaseStreamRouter<
	ActionRaw,
	ActionMin,
	ActionFull,
	ActionResponse,
	ActionStub,
	IActionRepository
> {
	constructor({
		app,
		commandBus,
		eventBus,
		eventRepository,
		streamRepository,
		repository,
	}: ActionRouterOpts) {
		super({
			app,
			commandBus,
			eventBus,
			eventRepository,
			streamRepository,
			repository,
			namespace: 'actions',
			descriptor: 'Action',
			descriptors: 'Actions',
		});
	}

	override toDto = toDto;

	override toStub = toStub;

	override get() {
		this.defaultGetById();
	}
}
