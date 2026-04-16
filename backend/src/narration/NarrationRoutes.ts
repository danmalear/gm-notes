import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import type { Express, Request, Response } from 'express';
import type {
	NarrationQueryParams,
	NarrationResponse,
} from './narration-dtos.ts';
import type { Narration } from './Narration.ts';
import { NarrationRepository } from './NarrationRepository.ts';

export class NarrationRoutes {
	static readonly apiNamespace = 'narrations';

	narrationRepository: NarrationRepository;

	constructor() {
		this.narrationRepository = new NarrationRepository();
	}

	async buildResponse(narration: Narration) {
		const regionResponse: NarrationResponse = {
			id: narration.NarrationId,
			name: narration.Name,
			description: narration.Description,
			isRead: narration.IsRead,
		};

		return regionResponse;
	}

	init(app: Express) {
		app.get(
			`/${NarrationRoutes.apiNamespace}`,
			async (
				req: Request<
					Record<string, never>,
					MessageResponse | DataResponse<NarrationResponse[]>,
					Record<string, never>,
					NarrationQueryParams
				>,
				res,
			) => {
				console.log(
					`Narration GET many request received. query: ${JSON.stringify(req.query)}`,
				);

				const narrations = req.query.regionId
					? await this.narrationRepository.getByRegionId(req.query.regionId)
					: await this.narrationRepository.getAll();

				const data: NarrationResponse[] = [];

				try {
					for (const narration of narrations) {
						data.push(await this.buildResponse(narration));
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
			`/${NarrationRoutes.apiNamespace}/:id`,
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

				const narration = await this.narrationRepository.getById(req.params.id);
				if (!narration) {
					res.status(404).send({
						message: `Narration with ID ${req.params.id} not found`,
					});
					return;
				}

				try {
					res.send({ data: await this.buildResponse(narration) });
				} catch (e) {
					res.status(500).send({
						message: getMessage(e),
					});
				}
			},
		);
	}
}
