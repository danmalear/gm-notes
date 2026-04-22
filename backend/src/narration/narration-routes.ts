import type { CommandRouter } from '#command/CommandRouter.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import type { Express, Request, Response } from 'express';
import type {
	NarrationQueryParams,
	NarrationResponse,
	NarrationStub,
} from './narration-dtos.ts';
import { toDto, toStub } from './narration-mappers.ts';
import type { NarrationRepository } from './NarrationRepository.ts';

export function narrationRoutes(
	app: Express,
	_commandRouter: CommandRouter,
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

	app.get(
		`/${apiNamespace}/:id`,
		async (
			req,
			res: Response<MessageResponse | DataResponse<NarrationResponse>>,
		) => {
			console.log(
				`Narration GET request received. params: ${JSON.stringify(req.params)}`,
			);

			if (!isUUID(req.params.id)) {
				res.status(400).send({ message: 'Invalid UUID format' });
				return;
			}

			const narration = await narrationRepository.getById(req.params.id);
			if (!narration) {
				res.status(404).send({
					message: `Narration with ID ${req.params.id} not found`,
				});
				return;
			}

			try {
				res.send({ data: toDto(narration) });
			} catch (e) {
				res.status(500).send({
					message: getMessage(e),
				});
			}
		},
	);
}
