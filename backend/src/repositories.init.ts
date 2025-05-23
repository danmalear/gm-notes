import {
	pkColumn as campaignPkColumn,
	tableName as campaignTableName,
	type Campaign,
} from './entities/Campaign';
import {
	pkColumn as campaignTemplatePkColumn,
	tableName as campaignTemplateTableName,
	type CampaignTemplate,
} from './entities/CampaignTemplate';
import { Repository } from './Repository';

export const campaignTemplateRepository = new Repository<CampaignTemplate>(
	campaignTemplateTableName,
	campaignTemplatePkColumn,
);

export const campaignRepository = new Repository<Campaign>(
	campaignTableName,
	campaignPkColumn,
);
