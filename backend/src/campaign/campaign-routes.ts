import type { CommandRouter } from '#command/CommandRouter.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getById } from '#shared/route-utils.ts';
import type { Express, Response } from 'express';
import type { CampaignStub } from './campaign-dtos.ts';
import { toDto, toStub } from './campaign-mappers.ts';
import { CampaignCommandHandler } from './CampaignCommandHandler.ts';
import type { CampaignRepository } from './CampaignRepository.ts';

export function campaignRoutes(
	app: Express,
	commandRouter: CommandRouter,
	campaignRepository: CampaignRepository,
) {
	const apiNamespace = 'campaigns';

	const campaignCommandHandler = new CampaignCommandHandler(campaignRepository);

	commandRouter.register('Campaign', campaignCommandHandler);

	app.get(
		`/${apiNamespace}`,
		async (
			_req,
			res: Response<MessageResponse | DataResponse<CampaignStub[]>>,
		) => {
			console.log(`Campaign GET all request received.`);

			const campaigns = await campaignRepository.getAll();

			const data: CampaignStub[] = [];

			for (const campaign of campaigns) {
				data.push(toStub(campaign));
			}

			res.send({
				data,
			});
		},
	);

	getById(app, {
		apiNamespace,
		objectDescriptor: 'Campaign',
		repository: campaignRepository,
		toDto,
	});

	return {
		campaignRepository,
	};
}
