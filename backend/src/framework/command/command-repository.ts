import type {
	CommandCreateInput,
	CommandModel,
	CommandUpdateInput,
} from '#prisma-models/Command.ts';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export type ICommandRepository = IRepository<
	CommandModel,
	CommandCreateInput,
	CommandUpdateInput
>;

export class CommandRepository
	extends Repository<CommandModel, CommandCreateInput, CommandUpdateInput>
	implements ICommandRepository
{
	override descriptor = 'Command';

	override async getByIdRaw(commandId: UUID): Promise<CommandModel | null> {
		try {
			return await this.prisma.command.findUnique({
				where: {
					CommandId: commandId,
				},
			});
		} catch (e) {
			throw this.getByIdError(commandId, e);
		}
	}

	override async getById(commandId: UUID): Promise<CommandModel | null> {
		return await this.getByIdRaw(commandId);
	}

	override async getAll(): Promise<CommandModel[]> {
		try {
			return await this.prisma.command.findMany();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: CommandCreateInput): Promise<CommandModel> {
		try {
			return await this.prisma.command.create({
				data,
			});
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		commandId: UUID,
		data: CommandUpdateInput,
	): Promise<CommandModel> {
		try {
			return await this.prisma.command.update({
				where: {
					CommandId: commandId,
				},
				data,
			});
		} catch (e) {
			throw this.updateError(commandId, e);
		}
	}
}
