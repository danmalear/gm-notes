import api from '#shared/api.ts';
import type { CommandResponse, DataResponse } from '#shared/dtos.ts';
import type { UUID } from 'crypto';
import type {
	CampaignResponse,
	CampaignStub,
	CreateCampaign,
	CreateCampaignRequest,
} from './campaign-dtos.ts';

export const getAllCampaigns = async () => {
	return await api.get<DataResponse<CampaignStub[]>>(`/campaigns`);
};

export const getCampaign = async (id: UUID) => {
	return await api.get<DataResponse<CampaignResponse>>(`/campaigns/${id}`);
};

export const createCampaign = async (data: CreateCampaign) => {
	const commandRequest: CreateCampaignRequest = {
		domain: 'Campaign',
		commandType: 'Create',
		command: data,
	};
	return await api.post<DataResponse<CommandResponse>>(
		`/commands`,
		commandRequest,
	);
};
