import type { ICommandBus } from '#command/command-bus.ts';
import type { IEventBus } from '#event/event-bus.ts';
import type { EventRepository } from '#event/event-repository.ts';
import type { IStreamRepository } from '#framework/stream/stream-repository.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getByIdDEPRECATED } from '#shared/route-utils.ts';
import type { Express, Response } from 'express';
import { CampaignCommandHandler } from './campaign-commands.ts';
import type { CampaignStub } from './campaign-dtos.ts';
import { toDto, toStub } from './campaign-mappers.ts';
import type { CampaignRepository } from './campaign-repository.ts';

export function campaignRoutes(
	app: Express,
	commandBus: ICommandBus,
	eventBus: IEventBus,
	eventRepository: EventRepository,
	streamRepository: IStreamRepository,
	campaignRepository: CampaignRepository,
) {
	const apiNamespace = 'campaigns';

	const campaignCommandHandler = new CampaignCommandHandler({
		eventBus,
		eventRepository,
		streamRepository,
		campaignRepository,
	});

	commandBus.subscribe('Campaign', campaignCommandHandler);

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

	getByIdDEPRECATED(app, {
		apiNamespace,
		objectDescriptor: 'Campaign',
		repository: campaignRepository,
		toDto,
	});
}
