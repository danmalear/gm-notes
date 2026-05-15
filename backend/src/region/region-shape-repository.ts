import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';

export type ShapeType = 'Rectangle' | 'Circle' | 'Polygon';

export interface RegionShapeRec {
	RegionShapeId: UUID;
	RegionId: UUID;
	ShapeType: ShapeType;
	Coords: object;
}

export const tableName = 'RegionShape';
export const pkColumn = 'RegionShapeId';

export class RegionShapeRepository extends Repository<RegionShapeRec> {
	constructor() {
		super(tableName, pkColumn);
	}

	override clone() {
		return new RegionShapeRepository();
	}

	override async getById(id: UUID): Promise<RegionShapeRec | undefined> {
		return await this.getByIdRaw(id);
	}

	/**
	 * Retrieves region shape records from the database for a given region ID
	 * @param regionId UUID of the region to get shapes for
	 * @returns The list of region shapes (empty array if none found)
	 */
	async getByRegionId(regionId: UUID) {
		try {
			return await db<RegionShapeRec>(this.tableName).where(
				'RegionId',
				regionId,
			);
		} catch (e) {
			throw Error(
				`Error getting shape records for region ID ${regionId}: ${getMessage(e)}`,
			);
		}
	}
}
