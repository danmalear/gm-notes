import { CampaignRepository } from '#campaign/CampaignRepository.ts';
import { MapRepository } from '#map/MapRepository.ts';
import { RegionRepository } from '#region/RegionRepository.ts';
import { RegionShapeRepository } from '#region/RegionShapeRepository.ts';
import { AbilityCheckRepository } from './repositories/AbilityCheckRepository.ts';
import { ActionRepository } from './repositories/ActionRepository.ts';
import { ConditionRepository } from './repositories/ConditionRepository.ts';
import { FileRepository } from './repositories/FileRepository.ts';
import { HandoutRepository } from './repositories/HandoutRepository.ts';
import { ItemRepository } from './repositories/ItemRepository.ts';
import { NarrationRepository } from './repositories/NarrationRepository.ts';
import { NoteRepository } from './repositories/NoteRepository.ts';

export const campaignRepository = new CampaignRepository();

export const mapRepository = new MapRepository();

export const regionRepository = new RegionRepository();
export const regionShapeRepository = new RegionShapeRepository();

export const narrationRepository = new NarrationRepository();
export const itemRepository = new ItemRepository();
export const actionRepository = new ActionRepository();
export const abilityCheckRepository = new AbilityCheckRepository();
export const handoutRepository = new HandoutRepository();

export const conditionRepository = new ConditionRepository();
export const noteRepository = new NoteRepository();

export const fileRepository = new FileRepository();
