import type { MapRec, MapRepository } from '#map/map-repository.ts';
import { Repository } from '#shared/Repository.ts';
import type { UUID } from 'crypto';

export interface CampaignRec {
	CampaignId: UUID;
	CampaignTemplateId: UUID | null;
	Name: string;
	ActiveMapId: UUID | null;
}

export interface CampaignRefRec extends CampaignRec {
	Maps: MapRec[];
}

export const tableName = 'Campaign';
export const pkColumn = 'CampaignId';

export class CampaignRepository extends Repository<
	CampaignRec,
	CampaignRefRec
> {
	mapRepository: MapRepository;

	constructor(mapRepository: MapRepository) {
		super(tableName, pkColumn);
		this.mapRepository = mapRepository;
	}

	override async getById(id: UUID): Promise<CampaignRefRec | undefined> {
		const campaign = await this.getByIdRaw(id);
		if (!campaign) return undefined;
		const maps = await this.mapRepository.getByCampaignId(id);
		return {
			...campaign,
			Maps: maps,
		};
	}
}
