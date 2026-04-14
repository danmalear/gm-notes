import { AbilityCheckRepository } from '#ability-check/AbilityCheckRepository.ts';
import { ActionRepository } from '#action/ActionRepository.ts';
import { CampaignRepository } from '#campaign/CampaignRepository.ts';
import { FileRepository } from '#file/FileRepository.ts';
import { HandoutRepository } from '#handout/HandoutRepository.ts';
import { ItemRepository } from '#item/ItemRepository.ts';
import { MapRepository } from '#map/MapRepository.ts';
import { NoteRepository } from '#note/NoteRepository.ts';
import { RegionRepository } from '#region/RegionRepository.ts';
import { RegionShapeRepository } from '#region/RegionShapeRepository.ts';
import { ConditionRepository } from './repositories/ConditionRepository.ts';
import { NarrationRepository } from './repositories/NarrationRepository.ts';

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
