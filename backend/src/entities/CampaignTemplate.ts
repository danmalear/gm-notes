import type { CampaignTemplate as CampaignTemplateDto } from '#dtos/models/CampaignTemplate.ts';
import { type UUID, randomUUID } from 'crypto';
import type { Entity } from './Entity.ts';

export class CampaignTemplate implements Entity<CampaignTemplateDto> {
	// Static properties
	static readonly tableName = 'CampaignTemplate';
	static readonly idColumn = 'CampaignTemplateId';

	// Static methods
	/**
	 *
	 * @param dto
	 * @returns
	 */
	static fromDto(dto: CampaignTemplateDto) {
		return new CampaignTemplate({
			CampaignTemplateId: dto.campaignTemplateId,
			Name: dto.name,
		});
	}

	// Properties
	CampaignTemplateId: UUID;
	Name: string;

	// Constructors
	constructor(data: Partial<CampaignTemplate>) {
		this.CampaignTemplateId = data.CampaignTemplateId ?? randomUUID();
		this.Name = data.Name ?? 'New Campaign Template';
	}

	// Methods
	/**
	 * Converts this campaign template into its DTO equivalent
	 * @returns Campaign template DTO
	 */
	toDto() {
		const dto: CampaignTemplateDto = {
			campaignTemplateId: this.CampaignTemplateId,
			name: this.Name,
		};
		return dto;
	}
}
