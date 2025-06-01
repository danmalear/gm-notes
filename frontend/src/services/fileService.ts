import type { FileUploadResponse } from '#dtos/File.ts';
import api from './api.ts';

export const uploadFile = async (data: FormData) => {
	return await api.post<FileUploadResponse>(`/files`, data);
};

export const filePath = (fileName: string) => {
	// @TODO Maybe eventually use app settings or something
	return `http://localhost:3000/files/${fileName}`;
};
