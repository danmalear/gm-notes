import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('Note', (table) => {
		table.uuid('NoteId').primary().notNullable();
		table.uuid('EntityId').notNullable();
		table.text('Description').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('Note');
}
