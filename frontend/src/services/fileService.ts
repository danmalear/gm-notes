import type { FileUploadResponse } from '#dtos/file.ts';
import api from './api.ts';

export const uploadFile = async (data: FormData) => {
	return await api.post<FileUploadResponse>(`/files`, data);
};

export const filePath = (fileName: string) => {
	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
	if (!baseUrl) {
		throw Error('Server base URL not defined.');
	}
	return `${baseUrl}/files/${fileName}`;
};
