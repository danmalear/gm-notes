import { db } from '#db';
import type { Models } from '#prisma';
import type { RegionMin } from '#region/region-repository.ts';
import { getMessage } from '#shared/error.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type MapMin = Scalars<Models.public_Map>;

export interface MapFull extends MapMin {
	Regions: RegionMin[];
}

export interface IMapRepository
	extends IRepository<MapMin, MapMin, MapMin, MapFull> {
	getByCampaignId(campaignId: UUID): Promise<MapMin[]>;
}

export class MapRepository
	extends Repository<MapMin, MapMin, MapMin, MapFull>
	implements IMapRepository
{
	override descriptor = 'Map';

	override async getByIdRaw(mapId: UUID): Promise<MapMin | null> {
		try {
			return await db.orm.public.Map.first({
				MapId: mapId,
			});
		} catch (e) {
			throw this.getByIdError(mapId, e);
		}
	}

	override async getById(mapId: UUID): Promise<MapFull | null> {
		try {
			return await db.orm.public.Map.include('Regions', (region) =>
				region.include('Shapes'),
			).first({
				MapId: mapId,
			});
		} catch (e) {
			throw this.getByIdError(mapId, e);
		}
	}

	override async getAll(): Promise<MapMin[]> {
		try {
			return await db.orm.public.Map.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: MapMin): Promise<MapMin> {
		try {
			return await db.orm.public.Map.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		mapId: UUID,
		data: Partial<MapMin>,
	): Promise<MapMin | null> {
		try {
			return await db.orm.public.Map.where({
				MapId: mapId,
			}).update(data);
		} catch (e) {
			throw this.updateError(mapId, e);
		}
	}

	/**
	 * Retrieves map records from the database for a given campaign ID
	 * @param id UUID of the campaign to get maps for
	 * @returns The list of maps (empty array if none found)
	 */
	async getByCampaignId(campaignId: UUID): Promise<MapMin[]> {
		try {
			const maps = await db.orm.public.Map.where({
				CampaignId: campaignId,
			}).all();
			return maps;
		} catch (e) {
			throw new Error(
				`Error getting ${this.descriptor} records by Campaign ID ${campaignId}: ${getMessage(e)}`,
			);
		}
	}
}
