import type { CurrencyUnit } from '#shared/data-types.ts';
import type { UUID } from 'crypto';

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
