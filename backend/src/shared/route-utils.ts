import type { Express, Response } from 'express';
import type { DataResponse, MessageResponse } from './dtos.ts';
import { getMessage } from './error.ts';
import type { Repository } from './Repository.ts';
import { isUUID } from './uuid.ts';

interface RouteOpts {
	apiNamespace: string;
}

export interface GetByIdOpts<TEntityRaw, TEntity extends TEntityRaw, TDto>
	extends RouteOpts {
	objectDescriptor: string;
	repository: Repository<TEntityRaw, TEntity>;
	toDto: (entity: TEntity) => TDto;
}

export function getById<TEntityRaw, TEntity extends TEntityRaw, TDto>(
	app: Express,
	{
		apiNamespace,
		objectDescriptor,
		repository,
		toDto,
	}: GetByIdOpts<TEntityRaw, TEntity, TDto>,
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

			const entity = await repository.getById(req.params.id);
			if (!entity) {
				res.status(404).send({
					message: `${objectDescriptor} with ID ${req.params.id} not found`,
				});
				return;
			}

			try {
				res.send({ data: toDto(entity) });
			} catch (e) {
				res.status(500).send({
					message: getMessage(e),
				});
			}
		},
	);
}
