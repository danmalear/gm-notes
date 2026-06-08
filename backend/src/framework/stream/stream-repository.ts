import type {
	StreamCreateInput,
	StreamModel,
	StreamUpdateInput,
} from '#prisma-models/Stream.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export type IStreamRepository = IRepository<
	StreamModel,
	StreamCreateInput,
	StreamUpdateInput
>;

export class StreamRepository
	extends Repository<StreamModel, StreamCreateInput, StreamUpdateInput>
	implements IStreamRepository
{
	override descriptor = 'Stream';

	override async getByIdRaw(streamId: UUID): Promise<StreamModel | null> {
		try {
			return await this.prisma.stream.findUnique({
				where: {
					StreamId: streamId,
				},
			});
		} catch (e) {
			throw this.getByIdError(streamId, e);
		}
	}

	override async getById(commandId: UUID): Promise<StreamModel | null> {
		return await this.getByIdRaw(commandId);
	}

	override async getAll(): Promise<StreamModel[]> {
		try {
			return await this.prisma.stream.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: StreamCreateInput): Promise<StreamModel> {
		try {
			return await this.prisma.stream.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		streamId: UUID,
		data: StreamUpdateInput,
	): Promise<StreamModel> {
		try {
			return await this.prisma.stream.update({
				where: {
					StreamId: streamId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(streamId, e);
		}
	}
}
