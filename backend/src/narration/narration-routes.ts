import type { ICommandBus } from '#command/command-bus.ts';
import type { IEventBus } from '#event/event-bus.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage } from '#shared/error.ts';
import { getByIdDEPRECATED } from '#shared/route-utils.ts';
import type { Express, Request } from 'express';
import type { NarrationQueryParams, NarrationStub } from './narration-dtos.ts';
import { toDto, toStub } from './narration-mappers.ts';
import type { NarrationRepository } from './narration-repository.ts';

export function narrationRoutes(
	app: Express,
	_commandBus: ICommandBus,
	_eventBus: IEventBus,
	narrationRepository: NarrationRepository,
) {
	const apiNamespace = 'narrations';

	app.get(
		`/${apiNamespace}`,
		async (
			req: Request<
				Record<string, never>,
				MessageResponse | DataResponse<NarrationStub[]>,
				Record<string, never>,
				NarrationQueryParams
			>,
			res,
		) => {
			console.log(
				`Narration GET many request received. query: ${JSON.stringify(req.query)}`,
			);

			const narrations = req.query.regionId
				? await narrationRepository.getByRegionId(req.query.regionId)
				: await narrationRepository.getAll();

			const data: NarrationStub[] = [];

			try {
				for (const narration of narrations) {
					data.push(toStub(narration));
				}
			} catch (e) {
				res.status(500).send({
					message: getMessage(e),
				});
			}

			res.send({
				data,
			});
		},
	);

	getByIdDEPRECATED(app, {
		apiNamespace,
		objectDescriptor: 'Narration',
		repository: narrationRepository,
		toDto,
	});
}
