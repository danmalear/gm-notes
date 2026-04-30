import api, { serverBaseUrl } from '#shared/api.ts';
import type { FileStub } from './file-dtos.ts';

export const uploadFile = async (data: FormData) => {
	return await api.post<FileStub>(`/files`, data);
};

export const filePath = (fileName: string) => {
	if (!serverBaseUrl) {
		throw Error('Server configuration not defined.');
	}
	return `${serverBaseUrl}/files/${fileName}`;
};
