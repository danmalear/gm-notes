import { type Campaign, pkColumn, tableName } from '../entities/Campaign.ts';
import { Repository } from './Repository.ts';

export class CampaignRepository extends Repository<Campaign> {
	constructor() {
		super(tableName, pkColumn);
	}
}
