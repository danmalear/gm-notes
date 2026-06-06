import type {
	StreamCreateInput,
	StreamDelegate,
	StreamModel,
	StreamUpdateInput,
	StreamWhereInput,
	StreamWhereUniqueInput,
} from '#prisma-models/Stream.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export type IStreamRepository = IRepository<
	StreamModel,
	StreamCreateInput,
	StreamUpdateInput
>;

export class StreamRepository
	extends Repository<
		StreamModel,
		StreamCreateInput,
		StreamUpdateInput,
		StreamWhereUniqueInput,
		StreamWhereInput,
		StreamDelegate
	>
	implements IStreamRepository
{
	override descriptor = 'Stream';
	override delegate = this.prisma.stream;

	async getByIdRaw(streamId: UUID): Promise<StreamModel | null> {
		return await this.$getOne({
			where: {
				StreamId: streamId,
			},
		});
	}

	async getById(commandId: UUID): Promise<StreamModel | null> {
		return await this.getByIdRaw(commandId);
	}

	async update(streamId: UUID, data: StreamUpdateInput): Promise<StreamModel> {
		return await this.$update({
			where: {
				StreamId: streamId,
			},
			data,
		});
	}
}
