import { CampaignRepository } from './repositories/CampaignRepository.ts';
import { CampaignTemplateRepository } from './repositories/CampaignTemplateRepository.ts';

export const campaignTemplateRepository = new CampaignTemplateRepository();

export const campaignRepository = new CampaignRepository();
