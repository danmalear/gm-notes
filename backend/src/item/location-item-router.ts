import { BaseStreamRouter, type BaseStreamRouterOpts } from '#shared/router.ts';
import type { LocationItemResponse, LocationItemStub } from './item-dtos.ts';
import { toDto, toStub } from './location-item-mappers.ts';
import type {
	ILocationItemRepository,
	LocationItemFull,
	LocationItemMin,
	LocationItemRaw,
} from './location-item-repository.ts';

export type LocationItemRouterOpts = BaseStreamRouterOpts<
	LocationItemRaw,
	LocationItemMin,
	LocationItemFull,
	ILocationItemRepository
>;

export class LocationItemRouter extends BaseStreamRouter<
	LocationItemRaw,
	LocationItemMin,
	LocationItemFull,
	LocationItemResponse,
	LocationItemStub,
	ILocationItemRepository
> {
	constructor({
		app,
		commandBus,
		eventBus,
		eventRepository,
		streamRepository,
		repository,
	}: LocationItemRouterOpts) {
		super({
			app,
			commandBus,
			eventBus,
			eventRepository,
			streamRepository,
			repository,
			namespace: 'items/location',
			descriptor: 'Item',
			descriptors: 'Items',
		});
	}

	override toDto = toDto;

	override toStub = toStub;

	override get() {
		this.defaultGetById();
	}
}
