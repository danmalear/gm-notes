import type { CommandRouter } from '#command/CommandRouter.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { isUUID } from '#shared/uuid.ts';
import type { Express, Response } from 'express';
import type { CampaignResponse, CampaignStub } from './campaign-dtos.ts';
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

	app.get(
		`/${apiNamespace}/:id`,
		async (
			req,
			res: Response<MessageResponse | DataResponse<CampaignResponse>>,
		) => {
			console.log(
				`Campaign GET request received. params: ${JSON.stringify(req.params)}`,
			);

			if (!isUUID(req.params.id)) {
				res.status(400).send({ message: 'Invalid UUID format' });
				return;
			}

			const campaign = await campaignRepository.getById(req.params.id);
			if (!campaign) {
				res.status(404).send({
					message: `Campaign with ID ${req.params.id} not found`,
				});
				return;
			}

			res.send({ data: toDto(campaign) });
		},
	);

	return {
		campaignRepository,
	};
}
