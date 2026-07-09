import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('Narration', (table) => {
		table.uuid('NarrationId').primary().notNullable();
		table.uuid('NarrationTemplateId');
		table.string('Name').notNullable();
		table.string('Description').notNullable();
		table.boolean('IsRead').notNullable().defaultTo(false);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('Narration');
}
