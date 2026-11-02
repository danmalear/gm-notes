import type { MessageResponse } from '#shared/dtos.ts';
import { BaseRouter, type BaseRouterOpts } from '#shared/router.ts';
import { isUUID, toUUID } from '#shared/uuid.ts';
import type { Response } from 'express';
import multer from 'multer';
import type { FileStub } from './file-dtos.ts';
import type { IFileRepository } from './file-repository.ts';

export interface FileRouterOpts extends BaseRouterOpts {
	repository: IFileRepository;
	uploadsPath: string;
}

export class FileRouter extends BaseRouter {
	repository: IFileRepository;
	uploadsPath: string;
	storage: multer.StorageEngine;
	upload: multer.Multer;

	constructor({ app, repository, uploadsPath }: FileRouterOpts) {
		super({
			app,
			namespace: 'files',
		});
		this.repository = repository;

		this.uploadsPath = uploadsPath;

		this.storage = multer.diskStorage({
			destination: this.uploadsPath,
			filename: (_req, file, cb) => {
				cb(null, toUUID(file.originalname));
			},
		});

		this.upload = multer({ storage: this.storage });
	}

	override get() {
		this.app.get(
			`/${this.namespace}/:fileId`,
			async (req, res: Response<MessageResponse | FileStub>) => {
				console.log(
					`File GET request received. params: ${JSON.stringify(req.params)}`,
				);

				if (!isUUID(req.params.fileId)) {
					res.status(400).send({ message: 'Invalid UUID format' });
					return;
				}

				const fileRecord = await this.repository.getByIdFull(req.params.fileId);

				if (!fileRecord) {
					res.status(404).send({ message: 'File not found' });
					return;
				}

				res.download(
					`${this.uploadsPath}/${req.params.fileId}`,
					fileRecord.FileName,
					(err) => {
						if (err) {
							console.error(err);
						}
					},
				);
			},
		);
	}
}
