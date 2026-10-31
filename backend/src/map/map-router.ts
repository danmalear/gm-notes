import { BaseStreamRouter, type BaseStreamRouterOpts } from '#shared/router.ts';
import type { MapResponse, MapStub } from './map-dtos.ts';
import { toDto, toStub } from './map-mappers.ts';
import type { IMapRepository, MapFull, MapMin } from './map-repository.ts';

export type MapRouterOpts = BaseStreamRouterOpts<
	MapMin,
	MapMin,
	MapMin,
	MapFull,
	IMapRepository
>;

export class MapRouter extends BaseStreamRouter<
	MapMin,
	MapMin,
	MapMin,
	MapFull,
	MapResponse,
	MapStub,
	IMapRepository
> {
	constructor({
		app,
		commandBus,
		eventBus,
		eventRepository,
		streamRepository,
		repository,
	}: MapRouterOpts) {
		super({
			app,
			commandBus,
			eventBus,
			eventRepository,
			streamRepository,
			repository,
			namespace: 'maps',
			descriptor: 'Map',
			descriptors: 'Maps',
		});
	}

	override toDto = toDto;

	override toStub = toStub;

	override get(): void {
		this.defaultGetById();
		this.defaultGetAll();
	}
}
