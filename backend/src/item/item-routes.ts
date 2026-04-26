import type { CommandBus } from '#command/CommandBus.ts';
import type { EventBus } from '#event/EventBus.ts';
import { getById } from '#shared/route-utils.ts';
import type { Express } from 'express';
import type { ItemRepository } from './item-repository.ts';
import { toDto } from './location-item-mappers.ts';
import type { LocationItemRepository } from './location-item-repository.ts';

export function itemRoutes(
	app: Express,
	_commandBus: CommandBus,
	_eventBus: EventBus,
	_itemRepository: ItemRepository,
	locationItemRepository: LocationItemRepository,
) {
	const apiNamespace = 'items';

	getById(app, {
		apiNamespace: `${apiNamespace}/location`,
		objectDescriptor: 'Location Item',
		repository: locationItemRepository,
		toDto,
	});
}
