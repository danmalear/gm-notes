import {
	pkColumn as campaignPkColumn,
	tableName as campaignTableName,
	type Campaign,
} from './entities/Campaign.ts';
import {
	pkColumn as campaignTemplatePkColumn,
	tableName as campaignTemplateTableName,
	type CampaignTemplate,
} from './entities/CampaignTemplate.ts';
import { Repository } from './repositories/Repository.ts';

export const campaignTemplateRepository = new Repository<CampaignTemplate>(
	campaignTemplateTableName,
	campaignTemplatePkColumn,
);

export const campaignRepository = new Repository<Campaign>(
	campaignTableName,
	campaignPkColumn,
);
