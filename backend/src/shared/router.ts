import type { ICommandBus } from '#command/command-bus.ts';
import type { IEventBus } from '#event/event-bus.ts';
import type { IEventRepository } from '#event/event-repository.ts';
import type { IStreamRepository } from '#stream/stream-repository.ts';
import type { Express, Response } from 'express';
import type { DataResponse, MessageResponse } from './dtos.ts';
import { getMessage, NotImplementedError } from './error.ts';
import type { IRepository } from './repository.ts';
import { isUUID } from './uuid.ts';

export interface BaseRouterOpts {
	app: Express;
}

export interface PrivateBaseRouterOpts {
	namespace: string;
}

type AllBaseRouterOpts = BaseRouterOpts & PrivateBaseRouterOpts;

export interface BaseRouterInitOpts<
	GetOpts,
	PostOpts,
	PutOpts,
	PatchOpts,
	DeleteOpts,
> {
	getOpts?: GetOpts;
	postOpts?: PostOpts;
	putOpts?: PutOpts;
	patchOpts?: PatchOpts;
	deleteOpts?: DeleteOpts;
}

/**
 * Base class to establish basic routes for a given namespace
 */
export class BaseRouter<
	GetOpts = undefined,
	PostOpts = undefined,
	PutOpts = undefined,
	PatchOpts = undefined,
	DeleteOpts = undefined,
> {
	app: Express;
	namespace: string;

	constructor({ app, namespace }: AllBaseRouterOpts) {
		this.app = app;
		this.namespace = namespace;
	}

	init({
		getOpts,
		postOpts,
		putOpts,
		patchOpts,
		deleteOpts,
	}: BaseRouterInitOpts<
		GetOpts,
		PostOpts,
		PutOpts,
		PatchOpts,
		DeleteOpts
	> = {}) {
		this.get(getOpts);
		this.post(postOpts);
		this.put(putOpts);
		this.patch(patchOpts);
		this.delete(deleteOpts);
	}

	get(_opts?: GetOpts) {
		this.app.get(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: `GET requests not supported for namespace ${this.namespace}`,
			});
		});
	}

	post(_opts?: PostOpts) {
		this.app.post(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: `POST requests not supported for namespace ${this.namespace}`,
			});
		});
	}

	put(_opts?: PutOpts) {
		this.app.put(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: `PUT requests not supported for namespace ${this.namespace}`,
			});
		});
	}

	patch(_opts?: PatchOpts) {
		this.app.patch(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: `PATCH requests not supported for namespace ${this.namespace}`,
			});
		});
	}

	delete(_opts?: DeleteOpts) {
		this.app.delete(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: `DELETE requests not supported for namespace ${this.namespace}`,
			});
		});
	}
}

export interface BaseStreamRouterOpts<
	TModel = unknown,
	TCreate = unknown,
	TUpdate = unknown,
	TModelIncludeAll extends TModel = TModel,
> extends BaseRouterOpts {
	repository: IRepository<TModel, TCreate, TUpdate, TModelIncludeAll>;
	commandBus: ICommandBus;
	eventBus: IEventBus;
	eventRepository: IEventRepository;
	streamRepository: IStreamRepository;
}

export interface PrivateBaseStreamRouterOpts extends PrivateBaseRouterOpts {
	descriptor: string;
	descriptors: string;
}

type AllBaseStreamRouterOpts<
	TModel,
	TCreate,
	TUpdate,
	TModelIncludeAll extends TModel,
> = BaseStreamRouterOpts<TModel, TCreate, TUpdate, TModelIncludeAll> &
	PrivateBaseStreamRouterOpts;

/**
 * Base class for a router that supports an event-sourced stream entity
 */
export class BaseStreamRouter<
	TModel,
	TCreate,
	TUpdate,
	TModelIncludeAll extends TModel,
	TDto,
	TStub = TDto,
	GetOpts = undefined,
	PostOpts = undefined,
	PutOpts = undefined,
	PatchOpts = undefined,
	DeleteOpts = undefined,
> extends BaseRouter<GetOpts, PostOpts, PutOpts, PatchOpts, DeleteOpts> {
	descriptor: string;
	descriptors: string;
	commandBus: ICommandBus;
	eventBus: IEventBus;
	repository: IRepository<TModel, TCreate, TUpdate, TModelIncludeAll>;
	eventRepository: IEventRepository;
	streamRepository: IStreamRepository;

	constructor({
		app,
		namespace,
		descriptor,
		descriptors,
		commandBus,
		eventBus,
		repository,
		eventRepository,
		streamRepository,
	}: AllBaseStreamRouterOpts<TModel, TCreate, TUpdate, TModelIncludeAll>) {
		super({
			app,
			namespace,
		});
		this.descriptor = descriptor;
		this.descriptors = descriptors;
		this.commandBus = commandBus;
		this.eventBus = eventBus;
		this.repository = repository;
		this.eventRepository = eventRepository;
		this.streamRepository = streamRepository;
	}

	toDto(_model: TModelIncludeAll): TDto {
		throw new NotImplementedError();
	}

	toStub(_model: TModel): TStub {
		throw new NotImplementedError();
	}

	/**
	 * Add a default get by ID route
	 */
	defaultGetById() {
		this.app.get(
			`/${this.namespace}/:id`,
			async (req, res: Response<MessageResponse | DataResponse<TDto>>) => {
				console.log(
					`${this.descriptor} GET request received. params: ${JSON.stringify(req.params)}`,
				);

				if (!isUUID(req.params.id)) {
					res.status(400).send({ message: 'Invalid UUID format' });
					return;
				}

				const model = await this.repository.getById(req.params.id);
				if (!model) {
					res.status(404).send({
						message: `${this.descriptor} with ID ${req.params.id} not found`,
					});
					return;
				}

				try {
					res.send({ data: this.toDto(model) });
				} catch (e) {
					res.status(500).send({
						message: getMessage(e),
					});
				}
			},
		);
	}

	/**
	 * Add a default get all route
	 */
	defaultGetAll() {
		this.app.get(
			`/${this.namespace}`,
			async (_req, res: Response<MessageResponse | DataResponse<TStub[]>>) => {
				console.log(`${this.descriptor} GET all request received.`);

				const records = await this.repository.getAll();

				const data: TStub[] = [];

				for (const record of records) {
					data.push(this.toStub(record));
				}

				res.send({
					data,
				});
			},
		);
	}
}
