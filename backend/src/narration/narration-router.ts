import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage } from '#shared/error.ts';
import { BaseStreamRouter, type BaseStreamRouterOpts } from '#shared/router.ts';
import type { Request } from 'express';
import type {
	NarrationQueryParams,
	NarrationResponse,
	NarrationStub,
} from './narration-dtos.ts';
import { toDto, toStub } from './narration-mappers.ts';
import type {
	INarrationRepository,
	NarrationMin,
} from './narration-repository.ts';

export type NarrationRouterOpts = BaseStreamRouterOpts<
	NarrationMin,
	NarrationMin,
	NarrationMin,
	NarrationMin,
	INarrationRepository
>;

export class NarrationRouter extends BaseStreamRouter<
	NarrationMin,
	NarrationMin,
	NarrationMin,
	NarrationMin,
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

	override toDto = toDto;

	override toStub = toStub;

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

				try {
					const data: NarrationStub[] = narrations.map(this.toStub);

					res.send({
						data,
					});
				} catch (e) {
					res.status(500).send({
						message: getMessage(e),
					});
				}
			},
		);
	}
}
