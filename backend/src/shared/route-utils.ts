import type { Express, Response } from 'express';
import type { DataResponse, MessageResponse } from './dtos.ts';
import { getMessage } from './error.ts';
import type { Repository } from './repository-old.ts';
import type { IRepository } from './repository.ts';
import { isUUID } from './uuid.ts';

interface RouteOpts {
	apiNamespace: string;
}

/**
 * @deprecated
 */
export interface GetByIdOptsDEPRECATED<
	TEntityRaw,
	TEntity extends TEntityRaw,
	TDto,
> extends RouteOpts {
	objectDescriptor: string;
	repository: Repository<TEntityRaw, TEntity>;
	toDto: (entity: TEntity) => TDto;
}

/**
 * Add a default get by ID route for a data model
 *
 * @deprecated
 * @param app Express app
 * @param opts Option params for get by ID route
 */
export function getByIdDEPRECATED<TEntityRaw, TEntity extends TEntityRaw, TDto>(
	app: Express,
	{
		apiNamespace,
		objectDescriptor,
		repository,
		toDto,
	}: GetByIdOptsDEPRECATED<TEntityRaw, TEntity, TDto>,
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

/**
 * Options for creating a default get by ID route
 */
export interface GetByIdOpts<TModel, TCreate, TUpdate, TDto> extends RouteOpts {
	objectDescriptor: string;
	repository: IRepository<TModel, TCreate, TUpdate>;
	toDto: (model: TModel) => TDto;
}

/**
 * Add a default get by ID route for a data model
 *
 * @param app Express app
 * @param opts Option params for get by ID route
 */
export function getById<TModel, TCreate, TUpdate, TDto>(
	app: Express,
	{
		apiNamespace,
		objectDescriptor,
		repository,
		toDto,
	}: GetByIdOpts<TModel, TCreate, TUpdate, TDto>,
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

			const model = await repository.getById(req.params.id);
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
