import type { IMapRepository } from '#map/map-repository.ts';
import type { MapModel } from '#prisma-models/Map.ts';
import { Repository } from '#shared/repository-old.ts';
import type { UUID } from 'crypto';

export interface CampaignRec {
	CampaignId: UUID;
	CampaignTemplateId: UUID | null;
	Name: string;
	ActiveMapId: UUID | null;
}

export interface CampaignRefRec extends CampaignRec {
	Maps: MapModel[];
}

export const tableName = 'Campaign';
export const pkColumn = 'CampaignId';

export interface CampaignRepositoryConfig {
	mapRepository: IMapRepository;
}

export class CampaignRepository extends Repository<
	CampaignRec,
	CampaignRefRec
> {
	mapRepository: IMapRepository;

	constructor({ mapRepository }: CampaignRepositoryConfig) {
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
