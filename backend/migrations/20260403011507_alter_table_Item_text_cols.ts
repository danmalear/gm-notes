import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Item', (table) => {
		table.text('Name').notNullable().alter();
		table.text('ValueUnit').alter();
		table.text('DetailsLink').alter();
		table.text('ImageFileId').alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Item', (table) => {
		table.string('Name').notNullable().alter();
		table.string('ValueUnit', 2).alter();
		table.string('DetailsLink').alter();
		table.string('ImageFileId').alter();
	});
}
