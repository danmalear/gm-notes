import type { UUID } from 'crypto';
import type { CurrencyUnit } from './data-types.ts';

export const tableName = 'Item';
export const pkColumn = 'ItemId';

export interface Item {
	ItemId: UUID;
	CampaignId: UUID | null;
	Name: string;
	IsContainer: boolean;
	Value: number | null;
	ValueUnit: CurrencyUnit | null;
	DetailsLink: string | null;
	ImageFileId: string | null;
}
