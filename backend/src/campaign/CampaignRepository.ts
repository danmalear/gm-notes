import { Repository } from '../repositories/Repository.ts';
import { type Campaign, pkColumn, tableName } from './Campaign.ts';

export class CampaignRepository extends Repository<Campaign> {
	constructor() {
		super(tableName, pkColumn);
	}
}
