import type { MapStub } from '#map/map-dtos.ts';
import type { CommandRequest } from '#shared/dtos.ts';
import type { UUID } from 'crypto';

// Commands

export type CampaignCommand<
	TRef extends string,
	TData extends object,
> = CommandRequest<'Campaign', TRef, TData>;

export interface CreateCampaign {
	name: string;
}

export interface CreateCampaignCommand
	extends CampaignCommand<'Create', CreateCampaign> {
	streamId: undefined;
}

// Queries

export interface CampaignResponse {
	id: UUID;
	name: string;
	activeMapId?: UUID;
	maps: MapStub[];
}

export interface CampaignStub {
	id: UUID;
	name: string;
	activeMapId?: UUID;
}

// Events

export interface CampaignCreated {
	id: UUID;
	name: string;
}
