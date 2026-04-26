import { db } from '#shared/db.ts';
import { tableColumns } from '#shared/entity-utils.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';

export interface NarrationRec {
	NarrationId: UUID;
	NarrationTemplateId: UUID | null;
	Name: string;
	Description: string;
	IsRead: boolean;
}

export interface RegionNarrationRec {
	RegionId: UUID;
	NarrationId: UUID;
}

export const tableName = 'Narration';
export const pkColumn = 'NarrationId';

export const columnNames: (keyof NarrationRec)[] = [
	'NarrationId',
	'NarrationTemplateId',
	'Name',
	'Description',
	'IsRead',
];

export const tableColumnNames = tableColumns(tableName, columnNames);

export const regionJoinTableName = 'RegionNarration';
export const pkColumns = ['RegionId', 'NarrationId'];
export const regionIdColName = 'RegionId';
export const narrationIdColName = 'NarrationId';

export class NarrationRepository extends Repository<NarrationRec> {
	constructor() {
		super(tableName, pkColumn);
	}

	override async getById(id: UUID): Promise<NarrationRec | undefined> {
		return await this.getByIdRaw(id);
	}

	/**
	 * Retrieves narration records from the database for a given region ID
	 * @param id UUID of the region to get narrations for
	 * @returns The list of narrations (empty array if none found)
	 */
	async getByRegionId(regionId: UUID) {
		try {
			return await db<NarrationRec>(this.tableName)
				.innerJoin<RegionNarrationRec>(
					regionJoinTableName,
					`${regionJoinTableName}.${narrationIdColName}`,
					`${this.tableName}.${this.pkColumn}`,
				)
				.where(`${regionJoinTableName}.${regionIdColName}`, regionId)
				.select<NarrationRec[]>(...tableColumnNames);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for region ID ${regionId}: ${getMessage(e)}`,
			);
		}
	}
}
