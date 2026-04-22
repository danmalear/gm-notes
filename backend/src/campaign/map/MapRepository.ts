import { RegionRepository } from '#region/RegionRepository.ts';
import { RegionShapeRepository } from '#region/RegionShapeRepository.ts';
import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import {
	pkColumn,
	tableName,
	type Map,
	type MapRaw,
	type TempRegion,
} from './Map.ts';

export class MapRepository extends Repository<MapRaw> {
	regionRepository: RegionRepository;
	regionShapeRepository: RegionShapeRepository;

	constructor(
		regionRepository: RegionRepository,
		regionShapeRepository: RegionShapeRepository,
	) {
		super(tableName, pkColumn);
		this.regionRepository = regionRepository;
		this.regionShapeRepository = regionShapeRepository;
	}

	override async getById(id: UUID): Promise<Map | undefined> {
		const map = await super.getById(id);
		if (!map) return undefined;
		const regions = await this.regionRepository.getByMapId(id);
		const regionsWithShapes: TempRegion[] = [];
		for (const region of regions) {
			const shapes = await this.regionShapeRepository.getByRegionId(
				region.RegionId,
			);
			regionsWithShapes.push({
				...region,
				Shapes: shapes,
			});
		}
		return {
			...map,
			Regions: regionsWithShapes,
		};
	}

	/**
	 * Retrieves map records from the database for a given campaign ID
	 * @param id UUID of the campaign to get maps for
	 * @returns The list of maps (empty array if none found)
	 */
	async getByCampaignId(campaignId: UUID) {
		try {
			return await db<MapRaw>(this.tableName).where('CampaignId', campaignId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for campaign ID ${campaignId}: ${getMessage(e)}`,
			);
		}
	}
}
