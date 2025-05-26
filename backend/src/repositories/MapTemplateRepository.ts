import type { UUID } from 'crypto';
import { db } from '../db.ts';
import {
	type MapTemplate,
	pkColumn,
	tableName,
} from '../entities/MapTemplate.ts';
import { getMessage } from '../helpers/error.ts';
import { Repository } from './Repository.ts';

export class MapTemplateRepository extends Repository<MapTemplate> {
	constructor() {
		super(tableName, pkColumn);
	}

	/**
	 * Retrieves map template records from the database for a given campaign template ID
	 * @param id UUID of the campaign template to get map templates for
	 * @returns The list of map templates (empty array if none found)
	 */
	async getByCampaignTemplateId(campaignTemplateId: UUID) {
		try {
			return await db<MapTemplate>(this.tableName).where(
				'CampaignTemplateId',
				campaignTemplateId,
			);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for campaign template ID ${campaignTemplateId}: ${getMessage(e)}`,
			);
		}
	}
}
