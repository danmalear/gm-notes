import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Item', (table) => {
		table.string('ImageFileId');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Item', (table) => {
		table.dropColumn('ImageFileId');
	});
}
