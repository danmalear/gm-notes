import { CampaignRepository } from './repositories/CampaignRepository.ts';
import { CampaignTemplateRepository } from './repositories/CampaignTemplateRepository.ts';
import { MapRepository } from './repositories/MapRepository.ts';
import { MapTemplateRepository } from './repositories/MapTemplateRepository.ts';

export const campaignTemplateRepository = new CampaignTemplateRepository();
export const campaignRepository = new CampaignRepository();

export const mapTemplateRepository = new MapTemplateRepository();
export const mapRepository = new MapRepository();
