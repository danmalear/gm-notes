import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Narration', (table) => {
		table.text('Name').notNullable().alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Narration', (table) => {
		table.string('Name').notNullable().alter();
	});
}
