import type { ICommandBus } from '#command/command-bus.ts';
import type { IEventBus } from '#event/event-bus.ts';
import type {
	NarrationCreateInput,
	NarrationModel,
	NarrationUpdateInput,
} from '#prisma-models/Narration.ts';
import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage } from '#shared/error.ts';
import { BaseStreamRouter, type BaseStreamRouterOpts } from '#shared/router.ts';
import type { Express, Request } from 'express';
import type {
	NarrationQueryParams,
	NarrationResponse,
	NarrationStub,
} from './narration-dtos.ts';
import { toDto, toStub } from './narration-mappers.ts';
import type { INarrationRepository } from './narration-repository.ts';

export type NarrationRouterOpts = BaseStreamRouterOpts<
	NarrationModel,
	NarrationCreateInput,
	NarrationUpdateInput,
	NarrationModel,
	INarrationRepository
>;

export class NarrationRouter extends BaseStreamRouter<
	NarrationModel,
	NarrationCreateInput,
	NarrationUpdateInput,
	NarrationModel,
	NarrationResponse,
	NarrationStub,
	INarrationRepository
> {
	constructor({
		app,
		repository,
		commandBus,
		eventBus,
		eventRepository,
		streamRepository,
	}: NarrationRouterOpts) {
		super({
			app,
			repository,
			commandBus,
			eventBus,
			eventRepository,
			streamRepository,
			namespace: 'narrations',
			descriptor: 'Narration',
			descriptors: 'Narrations',
		});
	}

	override toDto(model: NarrationModel): NarrationResponse {
		return toDto(model);
	}

	override toStub(model: NarrationModel): NarrationStub {
		return toStub(model);
	}

	override get(): void {
		this.defaultGetById();

		this.app.get(
			`/${this.namespace}`,
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
					? await this.repository.getByRegionId(req.query.regionId)
					: await this.repository.getAll();

				const data: NarrationStub[] = [];

				try {
					for (const narration of narrations) {
						data.push(this.toStub(narration));
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
	}
}

export interface NarrationRouteOpts {
	app: Express;
	commandBus: ICommandBus;
	eventBus: IEventBus;
	narrationRepository: INarrationRepository;
}
