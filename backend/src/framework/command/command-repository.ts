import { db } from '#db';
import type { Models } from '#prisma';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type CommandMin = Scalars<Models.es_Command>;

export type ICommandRepository = IRepository<
	CommandMin,
	CommandMin,
	CommandMin
>;

export class CommandRepository
	extends Repository<CommandMin, CommandMin, CommandMin>
	implements ICommandRepository
{
	override descriptor = 'Command';

	override async getByIdRaw(commandId: UUID): Promise<CommandMin | null> {
		try {
			return await db.orm.es.Command.first({
				CommandId: commandId,
			});
		} catch (e) {
			throw this.getByIdError(commandId, e);
		}
	}

	override async getById(commandId: UUID): Promise<CommandMin | null> {
		return await this.getByIdRaw(commandId);
	}

	override async getAll(): Promise<CommandMin[]> {
		try {
			return await db.orm.es.Command.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: CommandMin): Promise<CommandMin> {
		try {
			return await db.orm.es.Command.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		commandId: UUID,
		data: Partial<CommandMin>,
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
