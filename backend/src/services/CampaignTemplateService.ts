import { type UUID } from 'crypto';
import { db } from '../db.ts';
import { CampaignTemplate } from '../entities/CampaignTemplate.ts';
import { getMessage } from '../helpers/error.ts';
import type { EntityService } from './EntityService.ts';

export class CampaignTemplateService
	implements EntityService<CampaignTemplate>
{
	static _instance: CampaignTemplateService;

	/**
	 * @returns The singleton instance
	 */
	static getInstance() {
		if (!CampaignTemplateService._instance) {
			CampaignTemplateService._instance = new CampaignTemplateService();
		}
		return CampaignTemplateService._instance;
	}

	/**
	 * Retrieves a Campaign Template record from the database by its UUID
	 * @param id UUID of the Campaign Template to retrieve
	 * @returns The Campaign Template with the given UUID, or undefined if not found
	 */
	async getById(id: UUID): Promise<CampaignTemplate | undefined> {
		try {
			const record = await db<CampaignTemplate>(CampaignTemplate.tableName)
				.where(CampaignTemplate.idColumn, id)
				.first();

			return record ? new CampaignTemplate(record) : undefined;
		} catch (e) {
			throw Error(
				`Error getting ${CampaignTemplate.tableName} by ID: ${getMessage(e)}`,
			);
		}
	}

	/**
	 * Inserts a new Campaign Template record into the database
	 * @param data Campaign Template data to insert into database
	 * @returns The inserted record
	 */
	async insert(data: CampaignTemplate) {
		try {
			const record = await db<CampaignTemplate>(CampaignTemplate.tableName)
				.insert(data)
				.returning('*')
				.then((returning) => returning[0]);

			return new CampaignTemplate(record);
		} catch (e) {
			throw Error(
				`Error inserting ${CampaignTemplate.tableName}: ${getMessage(e)}`,
			);
		}
	}

	/**
	 * Updates an existing Campaign Template database record with new data
	 * @param id UUID of the existing record to update
	 * @param data New Campaign Template data to update the record with
	 * @returns The updated record
	 */
	async update(id: string, data: CampaignTemplate) {
		try {
			const record = await db<CampaignTemplate>(CampaignTemplate.tableName)
				.where(CampaignTemplate.idColumn, id)
				.update(data)
				.returning('*')
				.then((returning) => returning[0]);

			return new CampaignTemplate(record);
		} catch (e) {
			throw Error(
				`Error updating ${CampaignTemplate.tableName} with ID ${id}: ${getMessage(e)}`,
			);
		}
	}
}
