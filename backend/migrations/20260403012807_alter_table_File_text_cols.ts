import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('File', (table) => {
		table.text('FileName').notNullable().alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('File', (table) => {
		table.string('FileName').notNullable().alter();
	});
}
