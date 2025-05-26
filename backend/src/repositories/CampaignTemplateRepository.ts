import {
	type CampaignTemplate,
	pkColumn,
	tableName,
} from '../entities/CampaignTemplate.ts';
import { Repository } from './Repository.ts';

export class CampaignTemplateRepository extends Repository<CampaignTemplate> {
	constructor() {
		super(tableName, pkColumn);
	}
}
