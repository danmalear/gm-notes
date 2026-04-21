import { Repository } from '#shared/Repository.ts';
import { type CampaignRaw, pkColumn, tableName } from './Campaign.ts';

export class CampaignRepository extends Repository<CampaignRaw> {
	constructor() {
		super(tableName, pkColumn);
	}
}
