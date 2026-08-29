import type {
	MapCreateInput,
	MapModel,
	MapUpdateInput,
} from '#prisma-models/Map.ts';
import type { BaseStreamRouterOpts } from '#shared/router.ts';
import { BaseStreamRouter } from '#shared/router.ts';
import type { MapResponse, MapStub } from './map-dtos.ts';
import { toDto, toStub } from './map-mappers.ts';
import type { IMapRepository, MapIncludeAll } from './map-repository.ts';

export type MapRouterOpts = BaseStreamRouterOpts<
	MapModel,
	MapCreateInput,
	MapUpdateInput,
	MapIncludeAll,
	IMapRepository
>;

export class MapRouter extends BaseStreamRouter<
	MapModel,
	MapCreateInput,
	MapUpdateInput,
	MapIncludeAll,
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

	override toDto(model: MapIncludeAll): MapResponse {
		return toDto(model);
	}

	override toStub(model: MapModel): MapStub {
		return toStub(model);
	}

	override get(): void {
		this.defaultGetById();
		this.defaultGetAll();
	}
}
