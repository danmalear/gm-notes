import type { DataResponse } from '#dtos/DataResponse.ts';
import type { MessageResponse } from '#dtos/MessageResponse.ts';
import type { Express, Request, Response } from 'express';
import type {
	NarrationQueryParams,
	NarrationResponse,
} from '../dtos/Narration.ts';
import type { Narration } from '../entities/Narration.ts';
import { getMessage } from '../helpers/error.ts';
import { isUUID } from '../helpers/uuid.ts';
import { narrationRepository } from '../repositories.ts';

const apiNamespace = 'narrations';

async function buildResponse(narration: Narration) {
	const regionResponse: NarrationResponse = {
		id: narration.NarrationId,
		// @TODO
		narrationTemplate: undefined,
		name: narration.Name,
		description: narration.Description,
		isRead: narration.IsRead,
	};

	return regionResponse;
}

export const narrationRoutes = (app: Express) => {
	app.get(
		`/${apiNamespace}`,
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
				? await narrationRepository.getByRegionId(req.query.regionId)
				: await narrationRepository.getAll();

			const data: NarrationResponse[] = [];

			try {
				for (const narration of narrations) {
					data.push(await buildResponse(narration));
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
				res.send({ data: await buildResponse(narration) });
			} catch (e) {
				res.status(500).send({
					message: getMessage(e),
				});
			}
		},
	);
};
