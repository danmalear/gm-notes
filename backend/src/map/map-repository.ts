import type {
	MapCreateInput,
	MapInclude,
	MapModel,
	MapUpdateInput,
} from '#prisma-models/Map.ts';
import {
	includeMin as regionIncludeMin,
	type RegionIncludeMin,
} from '#region/region-repository.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export interface MapIncludeAll extends MapModel {
	Regions: RegionIncludeMin[];
}

export const includeAll = {
	Regions: {
		include: regionIncludeMin,
	},
} satisfies MapInclude;

export interface IMapRepository
	extends IRepository<MapModel, MapCreateInput, MapUpdateInput, MapIncludeAll> {
	getByCampaignId(campaignId: UUID): Promise<MapModel[]>;
}

export class MapRepository
	extends Repository<MapModel, MapCreateInput, MapUpdateInput, MapIncludeAll>
	implements IMapRepository
{
	override descriptor = 'Map';

	override async getByIdRaw(mapId: UUID): Promise<MapModel | null> {
		try {
			return await this.prisma.map.findUnique({
				where: {
					MapId: mapId,
				},
			});
		} catch (e) {
			throw this.getByIdError(mapId, e);
		}
	}

	override async getById(mapId: UUID): Promise<MapIncludeAll | null> {
		try {
			return await this.prisma.map.findUnique({
				where: {
					MapId: mapId,
				},
				include: includeAll,
			});
		} catch (e) {
			throw this.getByIdError(mapId, e);
		}
	}

	override async getAll(): Promise<MapModel[]> {
		try {
			return await this.prisma.map.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: MapCreateInput): Promise<MapModel> {
		try {
			return await this.prisma.map.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(mapId: UUID, data: MapUpdateInput): Promise<MapModel> {
		try {
			return await this.prisma.map.update({
				where: {
					MapId: mapId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(mapId, e);
		}
	}

	/**
	 * Retrieves map records from the database for a given campaign ID
	 * @param id UUID of the campaign to get maps for
	 * @returns The list of maps (empty array if none found)
	 */
	async getByCampaignId(campaignId: UUID) {
		try {
			const maps = await this.prisma.map.findMany({
				where: {
					CampaignId: campaignId,
				},
			});
			return maps;
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Campaign ID ${campaignId}: ${getMessage(e)}`,
			);
		}
	}
}
