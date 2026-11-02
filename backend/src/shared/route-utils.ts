import type { Express, Response } from 'express';
import type { DataResponse, MessageResponse } from './dtos.ts';
import { getMessage } from './error.ts';
import type { IRepository } from './repository.ts';
import { isUUID } from './uuid.ts';

interface RouteOpts {
	apiNamespace: string;
}

/**
 * Options for creating a default get by ID route
 */
export interface GetByIdOpts<
	TDto,
	TRaw,
	TMin extends TRaw = TRaw,
	TFull extends TMin = TMin,
> extends RouteOpts {
	objectDescriptor: string;
	repository: IRepository<TRaw, TMin, TFull>;
	toDto: (model: TFull) => TDto;
}

/**
 * Add a default get by ID route for a data model
 *
 * @param app Express app
 * @param opts Option params for get by ID route
 */
export function getById<
	TDto,
	TModelRaw,
	TModelMin extends TModelRaw,
	TModelFull extends TModelMin,
>(
	app: Express,
	{
		apiNamespace,
		objectDescriptor,
		repository,
		toDto,
	}: GetByIdOpts<TDto, TModelRaw, TModelMin, TModelFull>,
) {
	app.get(
		`/${apiNamespace}/:id`,
		async (req, res: Response<MessageResponse | DataResponse<TDto>>) => {
			console.log(
				`${objectDescriptor} GET request received. params: ${JSON.stringify(req.params)}`,
			);

			if (!isUUID(req.params.id)) {
				res.status(400).send({ message: 'Invalid UUID format' });
				return;
			}

			const model = await repository.getByIdFull(req.params.id);
			if (!model) {
				res.status(404).send({
					message: `${objectDescriptor} with ID ${req.params.id} not found`,
				});
				return;
			}

			try {
				res.send({ data: toDto(model) });
			} catch (e) {
				res.status(500).send({
					message: getMessage(e),
				});
			}
		},
	);
}
