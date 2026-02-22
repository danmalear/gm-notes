import type { UUID } from 'crypto';
import type { CurrencyUnit } from './data-types';

export const tableName = 'Item';
export const pkColumn = 'ItemId';

export interface Item {
	ItemId: UUID;
	CampaignId: UUID | null;
	Name: string;
	IsContainer: boolean;
	Value: number;
	ValueUnit: CurrencyUnit;
	DetailsLink: string;
}
