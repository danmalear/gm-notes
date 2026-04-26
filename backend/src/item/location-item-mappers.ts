import { toStub as actionToStub } from '#action/action-mappers.ts';
import type {
	LocationItemResponse,
	LocationItemResponseBase,
	LocationItemStub,
} from './item-dtos.ts';
import type { ItemRec } from './item-repository.ts';
import type {
	LocationItemRec,
	LocationItemRefRec,
} from './location-item-repository.ts';

export const toDto = (item: LocationItemRefRec) => {
	const locationItemResponseBase: LocationItemResponseBase = {
		id: item.LocationItemId,
		locationId: item.LocationId,
		itemId: item.ItemId,
		name: item.Name,
		value:
			item.Value !== null
				? `${item.Value} ${item.ValueUnit ?? 'GP'}`
				: undefined,
		detailsLink: item.DetailsLink ?? undefined,
		imageFileId: item.ImageFileId ?? undefined,
		quantity: item.Quantity,
		actions: item.Actions.map(actionToStub),
		notes: item.Notes.map((note) => note.Description),
	};

	const locationItemResponse: LocationItemResponse = item.IsContainer
		? {
				...locationItemResponseBase,
				isContainer: true,
				containedItems: item.ContainedItems.map(toStub),
			}
		: {
				...locationItemResponseBase,
				isContainer: false,
			};

	return locationItemResponse;
};

export const toStub = (item: ItemRec & LocationItemRec) => {
	const locationItemStub: LocationItemStub = {
		id: item.LocationItemId,
		locationId: item.LocationId,
		itemId: item.ItemId,
		name: item.Name,
		quantity: item.Quantity,
		isContainer: item.IsContainer,
	};

	return locationItemStub;
};
