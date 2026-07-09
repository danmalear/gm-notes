import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Action', (table) => {
		table.text('Name').notNullable().alter();
		table.text('Type').alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Action', (table) => {
		table.string('Name').notNullable().alter();
		table.string('Type').alter();
	});
}
