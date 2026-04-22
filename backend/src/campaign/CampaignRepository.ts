import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';
import {
	type Campaign,
	type CampaignRaw,
	pkColumn,
	tableName,
} from './Campaign.ts';
import { MapRepository } from './map/MapRepository.ts';

export class CampaignRepository extends Repository<CampaignRaw> {
	mapRepository: MapRepository;

	constructor(mapRepository: MapRepository) {
		super(tableName, pkColumn);
		this.mapRepository = mapRepository;
	}

	override async getById(id: UUID): Promise<Campaign | undefined> {
		const campaign = await super.getById(id);
		if (!campaign) return undefined;
		const maps = await this.mapRepository.getByCampaignId(id);
		return {
			...campaign,
			Maps: maps,
		};
	}
}
