import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';

export type HandoutType = 'Text' | 'Image' | 'File';

export interface HandoutRec {
	HandoutId: UUID;
	CampaignId: UUID;
	Name: string;
	Type: HandoutType;
	Source: string;
}

export interface RegionHandoutRec {
	RegionId: UUID;
	HandoutId: UUID;
}

export const tableName = 'Handout';
export const pkColumn = 'HandoutId';

export const regionJoinTableName = 'RegionHandout';
export const pkColumns = ['RegionId', 'HandoutId'];
export const regionIdColName = 'RegionId';
export const handoutIdColName = 'HandoutId';

export class HandoutRepository extends Repository<HandoutRec> {
	constructor() {
		super(tableName, pkColumn);
	}

	override clone() {
		return new HandoutRepository();
	}

	override async getById(id: UUID): Promise<HandoutRec | undefined> {
		return await this.getByIdRaw(id);
	}

	/**
	 * Retrieves handout records from the database for a given region ID
	 * @param id UUID of the region to get handouts for
	 * @returns The list of handouts (empty array if none found)
	 */
	async getByRegionId(regionId: UUID) {
		try {
			return await db<HandoutRec>(this.tableName)
				.innerJoin<RegionHandoutRec>(
					regionJoinTableName,
					`${regionJoinTableName}.${handoutIdColName}`,
					`${this.tableName}.${this.pkColumn}`,
				)
				.where(`${regionJoinTableName}.${regionIdColName}`, regionId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for region ID ${regionId}: ${getMessage(e)}`,
			);
		}
	}
}
