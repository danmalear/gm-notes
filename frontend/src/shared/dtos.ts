import type { UUID } from 'crypto';

export interface DataResponse<T> {
	data: T;
}

export interface MessageResponse {
	message: string;
}

export interface CommandResponse {
	id: UUID;
}
