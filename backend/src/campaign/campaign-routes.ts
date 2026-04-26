import type { MessageBus } from '#message/MessageBus.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getById } from '#shared/route-utils.ts';
import type { Express, Response } from 'express';
import { CampaignCommandHandler } from './campaign-commands.ts';
import type { CampaignStub } from './campaign-dtos.ts';
import { toDto, toStub } from './campaign-mappers.ts';
import type { CampaignRepository } from './campaign-repository.ts';

export function campaignRoutes(
	app: Express,
	messageBus: MessageBus,
	campaignRepository: CampaignRepository,
) {
	const apiNamespace = 'campaigns';

	const campaignCommandHandler = new CampaignCommandHandler(campaignRepository);

	messageBus.subscribe('CampaignCommand', campaignCommandHandler);

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
}
