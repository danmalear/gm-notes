import type { MapRepository } from '#map/MapRepository.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import {
	pkColumn,
	tableName,
	type Campaign,
	type CampaignRaw,
} from './Campaign.ts';

export class CampaignRepository extends Repository<CampaignRaw, Campaign> {
	mapRepository: MapRepository;

	constructor(mapRepository: MapRepository) {
		super(tableName, pkColumn);
		this.mapRepository = mapRepository;
	}

	override async getById(id: UUID): Promise<Campaign | undefined> {
		const campaign = await this.getByIdRaw(id);
		if (!campaign) return undefined;
		const maps = await this.mapRepository.getByCampaignId(id);
		return {
			...campaign,
			Maps: maps,
		};
	}
}
