import api from '../services/api.ts';
import type { FileStub } from './file-dtos.ts';

export const uploadFile = async (data: FormData) => {
	return await api.post<FileStub>(`/files`, data);
};

export const filePath = (fileName: string) => {
	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
	if (!baseUrl) {
		throw Error('Server base URL not defined.');
	}
	return `${baseUrl}/files/${fileName}`;
};
