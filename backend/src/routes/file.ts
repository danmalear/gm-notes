import type { MessageResponse } from '#dtos/MessageResponse.ts';
import type { FileStub } from '#dtos/file.ts';
import express, { type Express, type Request, type Response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileRepository } from '../repositories.ts';

const apiNamespace = 'files';

const upload = multer({ dest: path.resolve('uploads') });

export const fileRoutes = (app: Express) => {
	app.use(`/${apiNamespace}`, express.static(path.resolve('uploads')));

	app.post(
		`/${apiNamespace}`,
		upload.single('file'),
		async (
			req: Request<object, undefined>,
			res: Response<MessageResponse | FileStub>,
		) => {
			console.log(
				`File POST request received. file: ${JSON.stringify(req.file)}`,
			);

			if (!req.file) {
				res.status(400).send({
					message: 'File upload request malformed - no file found on request',
				});
				return;
			}

			const file = await fileRepository.insert({
				FileId: req.file.filename,
				FileName: req.file.originalname,
			});

			res.send({
				fileId: file.FileId,
				fileName: file.FileName,
			});
		},
	);
};
