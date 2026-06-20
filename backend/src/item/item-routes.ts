import type { ICommandBus } from '#command/command-bus.ts';
import type { IEventBus } from '#event/event-bus.ts';
import { getByIdDEPRECATED } from '#shared/route-utils.ts';
import type { Express } from 'express';
import type { IItemRepository } from './item-repository.ts';
import { toDto } from './location-item-mappers.ts';
import type { LocationItemRepository } from './location-item-repository.ts';

export function itemRoutes(
	app: Express,
	_commandBus: ICommandBus,
	_eventBus: IEventBus,
	_itemRepository: IItemRepository,
	locationItemRepository: LocationItemRepository,
) {
	const apiNamespace = 'items';

	getByIdDEPRECATED(app, {
		apiNamespace: `${apiNamespace}/location`,
		objectDescriptor: 'Location Item',
		repository: locationItemRepository,
		toDto,
	});
}
