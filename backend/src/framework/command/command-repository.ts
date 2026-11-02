import { db } from '#db';
import type { Models } from '#prisma';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type CommandRaw = Scalars<Models.es_Command>;
export type CommandMin = CommandRaw;
export type CommandFull = CommandMin;

export type ICommandRepository = IRepository<
	CommandRaw,
	CommandMin,
	CommandFull
>;

export class CommandRepository
	extends Repository<CommandRaw, CommandMin, CommandFull>
	implements ICommandRepository
{
	override descriptor = 'Command';

	override async getByIdMin(commandId: UUID): Promise<CommandMin | null> {
		try {
			return await db.orm.es.Command.first({
				CommandId: commandId,
			});
		} catch (e) {
			throw this.getByIdError(commandId, e);
		}
	}

	override async getByIdFull(commandId: UUID): Promise<CommandFull | null> {
		return await this.getByIdMin(commandId);
	}

	override async getAll(): Promise<CommandMin[]> {
		try {
			return await db.orm.es.Command.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: CommandRaw): Promise<CommandMin> {
		try {
			return await db.orm.es.Command.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		commandId: UUID,
		data: Partial<CommandRaw>,
	): Promise<CommandMin | null> {
		try {
			return await db.orm.es.Command.where({
				CommandId: commandId,
			}).update(data);
		} catch (e) {
			throw this.updateError(commandId, e);
		}
	}
}
