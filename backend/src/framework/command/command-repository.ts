import type {
	CommandCreateInput,
	CommandModel,
	CommandUpdateInput,
} from '#prisma-models/Command.ts';
import { getMessage } from '#shared/error.ts';
import { Repository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export class CommandRepository extends Repository<
	CommandModel,
	CommandCreateInput,
	CommandUpdateInput
> {
	override descriptor = 'Command';

	async getByIdRaw(commandId: UUID): Promise<CommandModel | null> {
		return await this.$getOne({
			delegate: this.prisma.command,
			where: {
				CommandId: commandId,
			},
		});
	}

	async getById(commandId: UUID): Promise<CommandModel | null> {
		return await this.getByIdRaw(commandId);
	}

	async getAll(): Promise<CommandModel[]> {
		return await this.$getMany({
			delegate: this.prisma.command,
		});
	}

	async insert(data: CommandCreateInput): Promise<CommandModel> {
		try {
			return await this.prisma.command.create({
				data,
			});
		} catch (e) {
			throw new Error(`Error creating new Command: ${getMessage(e)}`);
		}
	}

	async update(
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
			throw new Error(
				`Error updating Command with ID ${commandId}: ${getMessage(e)}`,
			);
		}
	}
}
