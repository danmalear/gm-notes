import { AbilityCheckRepository } from './repositories/AbilityCheckRepository.ts';
import { ActionRepository } from './repositories/ActionRepository.ts';
import { CampaignRepository } from './repositories/CampaignRepository.ts';
import { CampaignTemplateRepository } from './repositories/CampaignTemplateRepository.ts';
import { ItemRepository } from './repositories/ItemRepository.ts';
import { MapRepository } from './repositories/MapRepository.ts';
import { MapTemplateRepository } from './repositories/MapTemplateRepository.ts';
import { NarrationRepository } from './repositories/NarrationRepository.ts';
import { NoteRepository } from './repositories/NoteRepository.ts';
import { RegionRepository } from './repositories/RegionRepository.ts';
import { RegionShapeRepository } from './repositories/RegionShapeRepository.ts';

export const campaignTemplateRepository = new CampaignTemplateRepository();
export const campaignRepository = new CampaignRepository();

export const mapTemplateRepository = new MapTemplateRepository();
export const mapRepository = new MapRepository();

export const regionRepository = new RegionRepository();
export const regionShapeRepository = new RegionShapeRepository();

export const narrationRepository = new NarrationRepository();
export const itemRepository = new ItemRepository();
export const actionRepository = new ActionRepository();
export const abilityCheckRepository = new AbilityCheckRepository();

export const noteRepository = new NoteRepository();
