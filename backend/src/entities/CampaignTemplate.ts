import { type UUID, randomUUID } from 'crypto';

export class CampaignTemplate {
	// Static properties
	static readonly tableName = 'CampaignTemplate';
	static readonly idColumn = 'CampaignTemplateId';

	// Properties
	CampaignTemplateId: UUID;
	Name: string;

	// Constructors
	constructor(data: Partial<CampaignTemplate>) {
		this.CampaignTemplateId = data.CampaignTemplateId ?? randomUUID();
		this.Name = data.Name ?? 'New Campaign Template';
	}
}
