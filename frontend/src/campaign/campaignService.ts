import type { CommandResponse } from '#dtos/command.ts';
import type { DataResponse } from '#dtos/DataResponse.ts';
import type { UUID } from 'crypto';
import api from '../services/api.ts';
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
