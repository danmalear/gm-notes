import type { CommandRouter } from '#command/CommandRouter.ts';
import { getById } from '#shared/route-utils.ts';
import type { Express } from 'express';
import type { ItemRepository } from './ItemRepository.ts';
import type { LocationItemRepository } from './LocationItemRepository.ts';
import { toDto } from './location-item-mappers.ts';

export function itemRoutes(
	app: Express,
	_commandRouter: CommandRouter,
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
