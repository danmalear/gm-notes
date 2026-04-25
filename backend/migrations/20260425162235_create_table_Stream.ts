import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('es_Stream', (table) => {
		table.uuid('StreamId').notNullable().primary();
		table.text('Type').notNullable();
		table.integer('Version').notNullable().defaultTo(0);
		table.timestamp('CreatedAt', { useTz: true }).notNullable();
		table.timestamp('UpdatedAt', { useTz: true }).notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('es_Stream');
}
