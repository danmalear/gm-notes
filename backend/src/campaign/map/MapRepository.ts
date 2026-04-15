import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import { db } from '../../db.ts';
import { type Map, pkColumn, tableName } from './Map.ts';

export class MapRepository extends Repository<Map> {
	constructor() {
		super(tableName, pkColumn);
	}

	/**
	 * Retrieves map records from the database for a given campaign ID
	 * @param id UUID of the campaign to get maps for
	 * @returns The list of maps (empty array if none found)
	 */
	async getByCampaignId(campaignId: UUID) {
		try {
			return await db<Map>(this.tableName).where('CampaignId', campaignId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for campaign ID ${campaignId}: ${getMessage(e)}`,
			);
		}
	}
}
