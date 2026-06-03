import type { PrismaClient } from '#prisma-client';
import type {
	StreamCreateInput,
	StreamModel,
	StreamUpdateInput,
} from '#prisma-models/Stream.ts';
import { getMessage } from '#shared/error.ts';
import type { IRepository, IRepositoryConfig } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export class StreamRepository
	implements IRepository<StreamModel, StreamCreateInput, StreamUpdateInput>
{
	prisma: PrismaClient;

	constructor({ prisma }: IRepositoryConfig) {
		this.prisma = prisma;
	}

	async getByIdRaw(streamId: UUID): Promise<StreamModel | null> {
		try {
			return await this.prisma.stream.findUnique({
				where: {
					StreamId: streamId,
				},
			});
		} catch (e) {
			throw new Error(`Error getting Stream by ID: ${getMessage(e)}`);
		}
	}

	async getById(commandId: UUID): Promise<StreamModel | null> {
		return await this.getByIdRaw(commandId);
	}

	async getAll(): Promise<StreamModel[]> {
		try {
			return await this.prisma.stream.findMany();
		} catch (e) {
			throw new Error(`Error getting all Stream records: ${getMessage(e)}`);
		}
	}

	async insert(data: StreamCreateInput): Promise<StreamModel> {
		try {
			return await this.prisma.stream.create({
				data,
			});
		} catch (e) {
			throw new Error(`Error creating new Stream: ${getMessage(e)}`);
		}
	}

	async update(streamId: UUID, data: StreamUpdateInput): Promise<StreamModel> {
		try {
			return await this.prisma.stream.update({
				where: {
					StreamId: streamId,
				},
				data,
			});
		} catch (e) {
			throw new Error(
				`Error updating Stream with ID ${streamId}: ${getMessage(e)}`,
			);
		}
	}
}
