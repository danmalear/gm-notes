import type { ICommandBus } from '#command/command-bus.ts';
import type { IEventBus } from '#event/event-bus.ts';
import { getById } from '#shared/route-utils.ts';
import type { Express } from 'express';
import type { IItemRepository } from './item-repository.ts';
import { toDto } from './location-item-mappers.ts';
import type { ILocationItemRepository } from './location-item-repository.ts';

export interface ItemRouteOpts {
	app: Express;
	commandBus: ICommandBus;
	eventBus: IEventBus;
	itemRepository: IItemRepository;
	locationItemRepository: ILocationItemRepository;
}

export function itemRoutes({ app, locationItemRepository }: ItemRouteOpts) {
	const apiNamespace = 'items';

	getById(app, {
		apiNamespace: `${apiNamespace}/location`,
		objectDescriptor: 'Location Item',
		repository: locationItemRepository,
		toDto,
	});
}
