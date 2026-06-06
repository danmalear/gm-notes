import type {
	CommandCreateInput,
	CommandDelegate,
	CommandModel,
	CommandUpdateInput,
	CommandWhereInput,
	CommandWhereUniqueInput,
} from '#prisma-models/Command.ts';
import { Repository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export class CommandRepository extends Repository<
	CommandModel,
	CommandCreateInput,
	CommandUpdateInput,
	CommandWhereUniqueInput,
	CommandWhereInput,
	CommandDelegate
> {
	override descriptor = 'Command';
	override delegate = this.prisma.command;

	async getByIdRaw(commandId: UUID): Promise<CommandModel | null> {
		return await this.$getOne({
			where: {
				CommandId: commandId,
			},
		});
	}

	async getById(commandId: UUID): Promise<CommandModel | null> {
		return await this.getByIdRaw(commandId);
	}

	async getAll(): Promise<CommandModel[]> {
		return await this.$getMany();
	}

	async insert(data: CommandCreateInput): Promise<CommandModel> {
		return await this.$insert({ data });
	}

	async update(
		commandId: UUID,
		data: CommandUpdateInput,
	): Promise<CommandModel> {
		return await this.$update({
			where: {
				CommandId: commandId,
			},
			data,
		});
	}
}
