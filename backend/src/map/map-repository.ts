import type {
	RegionRecShapes,
	RegionRepository,
} from '#region/region-repository.ts';
import type { RegionShapeRepository } from '#region/region-shape-repository.ts';
import type { Lighting } from '#shared/data-types.ts';
import { db } from '#shared/db.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';

export interface MapRec {
	MapId: UUID;
	CampaignId: UUID;
	MapTemplateId: UUID | null;
	Name: string;
	ImagePath: string;
	DefaultLighting: Lighting;
	Width: number;
	Height: number;
}

export interface MapRefRec extends MapRec {
	Regions: RegionRecShapes[];
}

export const tableName = 'Map';
export const pkColumn = 'MapId';

export class MapRepository extends Repository<MapRec, MapRefRec> {
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

	clone() {
		return new MapRepository(
			this.regionRepository.clone(),
			this.regionShapeRepository.clone(),
		);
	}

	override async getById(id: UUID): Promise<MapRefRec | undefined> {
		const map = await this.getByIdRaw(id);
		if (!map) return undefined;
		const regions = await this.regionRepository.getByMapId(id);
		const regionsWithShapes: RegionRecShapes[] = [];
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
			return await db<MapRec>(this.tableName).where('CampaignId', campaignId);
		} catch (e) {
			throw Error(
				`Error getting ${this.tableName} records for campaign ID ${campaignId}: ${getMessage(e)}`,
			);
		}
	}
}
