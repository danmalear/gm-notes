import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return await knex.schema.createTable('Condition', (table) => {
		table.uuid('ConditionId').primary().notNullable();
		table.string('Name').notNullable();
		table.string('Description').notNullable();
		table.boolean('IsMet').notNullable().defaultTo(false);
	});
}

export async function down(knex: Knex): Promise<void> {
	return await knex.schema.dropTable('Condition');
}
