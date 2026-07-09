import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('es_Command', (table) => {
		table.text('Context').notNullable().alter();
		table.text('Type').notNullable().alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('es_Command', (table) => {
		table.string('Context').notNullable().alter();
		table.string('Type').notNullable().alter();
	});
}
