import api from '#shared/api.ts';
import type { FileStub } from './file-dtos.ts';

export const uploadFile = async (data: FormData) => {
	return await api.post<FileStub>(`/files`, data);
};

export const filePath = (fileName: string) => {
	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
	const port = import.meta.env.VITE_SERVER_PORT;
	if (!baseUrl || !port) {
		throw Error('Server configuration not defined.');
	}
	return `${baseUrl}:${port}/files/${fileName}`;
};
