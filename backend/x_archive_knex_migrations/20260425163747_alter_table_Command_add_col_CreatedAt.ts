import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('es_Command', (table) => {
		table.timestamp('CreatedAt').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('es_Command', (table) => {
		table.dropColumn('CreatedAt');
	});
}
