import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('es_Command', (table) => {
		table.jsonb('Data').notNullable().alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('es_Command', (table) => {
		table.json('Data').notNullable().alter();
	});
}
