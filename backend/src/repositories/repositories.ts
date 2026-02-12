import { CampaignRepository } from './CampaignRepository.ts';
import { CampaignTemplateRepository } from './CampaignTemplateRepository.ts';
import { MapRepository } from './MapRepository.ts';
import { MapTemplateRepository } from './MapTemplateRepository.ts';
import { RegionRepository } from './RegionRepository.ts';

export const campaignTemplateRepository = new CampaignTemplateRepository();
export const campaignRepository = new CampaignRepository();

export const mapTemplateRepository = new MapTemplateRepository();
export const mapRepository = new MapRepository();

export const regionRepository = new RegionRepository();
