import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Condition', (table) => {
		table.text('Name').notNullable().alter();
		table.text('Description').notNullable().alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Condition', (table) => {
		table.string('Name').notNullable().alter();
		table.string('Description').notNullable().alter();
	});
}
