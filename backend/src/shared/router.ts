import type { Express } from 'express';

export interface BaseRouterOpts {
	app: Express;
}

interface PrivateRouterOpts {
	namespace: string;
}

type AllBaseRouterOpts = BaseRouterOpts & PrivateRouterOpts;

export interface BaseRouterInitOpts<
	GetOpts,
	PostOpts,
	PutOpts,
	PatchOpts,
	DeleteOpts,
> {
	getOpts: GetOpts;
	postOpts: PostOpts;
	putOpts: PutOpts;
	patchOpts: PatchOpts;
	deleteOpts: DeleteOpts;
}

export class BaseRouter<
	GetOpts = unknown,
	PostOpts = unknown,
	PutOpts = unknown,
	PatchOpts = unknown,
	DeleteOpts = unknown,
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
	}: BaseRouterInitOpts<GetOpts, PostOpts, PutOpts, PatchOpts, DeleteOpts>) {
		this.get(getOpts);
		this.post(postOpts);
		this.put(putOpts);
		this.patch(patchOpts);
		this.delete(deleteOpts);
	}

	get(_opts: GetOpts) {
		this.app.get(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: 'GET requests not supported for the given namespace',
			});
		});
	}

	post(_opts: PostOpts) {
		this.app.post(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: 'POST requests not supported for the given namespace',
			});
		});
	}

	put(_opts: PutOpts) {
		this.app.put(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: 'PUT requests not supported for the given namespace',
			});
		});
	}

	patch(_opts: PatchOpts) {
		this.app.patch(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: 'PATCH requests not supported for the given namespace',
			});
		});
	}

	delete(_opts: DeleteOpts) {
		this.app.delete(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: 'DELETE requests not supported for the given namespace',
			});
		});
	}
}
