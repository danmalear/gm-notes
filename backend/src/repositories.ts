import { CampaignRepository } from './repositories/CampaignRepository.ts';
import { CampaignTemplateRepository } from './repositories/CampaignTemplateRepository.ts';
import { MapRepository } from './repositories/MapRepository.ts';
import { MapTemplateRepository } from './repositories/MapTemplateRepository.ts';
import { NarrationRepository } from './repositories/NarrationRepository.ts';
import { RegionRepository } from './repositories/RegionRepository.ts';

export const campaignTemplateRepository = new CampaignTemplateRepository();
export const campaignRepository = new CampaignRepository();

export const mapTemplateRepository = new MapTemplateRepository();
export const mapRepository = new MapRepository();

export const regionRepository = new RegionRepository();

export const narrationRepository = new NarrationRepository();
