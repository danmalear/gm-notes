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
	async getByIdRaw(commandId: UUID): Promise<CommandModel | null> {
		return await this.$getByIdRaw({
			delegate: this.prisma.command,
			where: {
				CommandId: commandId,
			},
			descriptor: 'Command',
		});
	}

	async getById(commandId: UUID): Promise<CommandModel | null> {
		return await this.getByIdRaw(commandId);
	}

	async getAll(): Promise<CommandModel[]> {
		try {
			return await this.prisma.command.findMany();
		} catch (e) {
			throw new Error(`Error getting all Command records: ${getMessage(e)}`);
		}
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
