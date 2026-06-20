import { toStub as actionToStub } from '#action/action-mappers.ts';
import type { UUID } from 'node:crypto';
import type {
	LocationItemResponse,
	LocationItemResponseBase,
	LocationItemStub,
} from './item-dtos.ts';
import type {
	LocationItemIncludeAll,
	LocationItemIncludeMin,
} from './location-item-repository.ts';

export const toDto = (locationItem: LocationItemIncludeAll) => {
	const item = locationItem.Item;

	const locationItemResponseBase: LocationItemResponseBase = {
		id: locationItem.LocationItemId as UUID,
		locationId: locationItem.LocationId as UUID,
		itemId: locationItem.ItemId as UUID,
		name: item.Name,
		value:
			item.Value !== null
				? `${item.Value} ${item.ValueUnit ?? 'GP'}`
				: undefined,
		detailsLink: item.DetailsLink ?? undefined,
		imageFileId: item.ImageFileId ?? undefined,
		quantity: locationItem.Quantity,
		actions: [
			...item.Actions.map(actionToStub),
			...locationItem.Actions.map(actionToStub),
		],
		notes: locationItem.Notes.map((note) => note.Description),
	};

	const locationItemResponse: LocationItemResponse = item.IsContainer
		? {
				...locationItemResponseBase,
				isContainer: true,
				containedItems: locationItem.Contents.map(toStub),
			}
		: {
				...locationItemResponseBase,
				isContainer: false,
			};

	return locationItemResponse;
};

export const toStub = (locationItem: LocationItemIncludeMin) => {
	const item = locationItem.Item;

	const locationItemStub: LocationItemStub = {
		id: locationItem.LocationItemId as UUID,
		locationId: locationItem.LocationId as UUID,
		itemId: locationItem.ItemId as UUID,
		name: item.Name,
		quantity: locationItem.Quantity,
		isContainer: item.IsContainer,
	};

	return locationItemStub;
};
