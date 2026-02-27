import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('File', (table) => {
		table.uuid('FileId').primary().notNullable();
		table.string('FileName').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('File');
}
