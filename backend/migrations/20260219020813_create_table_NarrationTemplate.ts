import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('NarrationTemplate', (table) => {
		table.uuid('NarrationTemplateId').primary().notNullable();
		table.string('Name').notNullable();
		table.string('Description').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('NarrationTemplate');
}
