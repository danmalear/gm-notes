import type { MessageResponse } from '#shared/dtos.ts';
import type { Express, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import type { FileStub } from './file-dtos.ts';
import type { IFileRepository } from './file-repository.ts';

const upload = multer({ dest: path.resolve('uploads') });

export function fileRoutes(app: Express, fileRepository: IFileRepository) {
	const apiNamespace = 'files';

	app.get(
		`/${apiNamespace}/:fileId`,
		async (req, res: Response<MessageResponse | FileStub>) => {
			console.log(
				`File GET request received. params: ${JSON.stringify(req.params)}`,
			);

			if (req.params.fileId.length !== 32) {
				res.status(400).send({ message: 'Invalid file ID format' });
				return;
			}

			const fileRecord = await fileRepository.getById(req.params.fileId);

			if (!fileRecord) {
				res.status(404).send({ message: 'File not found' });
				return;
			}

			res.download(
				`${path.resolve('uploads')}/${req.params.fileId}`,
				fileRecord.FileName,
				(err) => {
					if (err) {
						console.error(err);
					}
				},
			);
		},
	);

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

			const file = await fileRepository.create({
				FileId: req.file.filename,
				FileName: req.file.originalname,
			});

			res.send({
				fileId: file.FileId,
				fileName: file.FileName,
			});
		},
	);
}
