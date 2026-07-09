import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('es_Event', (table) => {
		table.uuid('EventId').notNullable().primary();
		table.uuid('StreamId').notNullable().primary();
		table.uuid('CorrelationId').notNullable();
		table.text('Context').notNullable();
		table.text('Type').notNullable();
		table.integer('Version').notNullable();
		table.jsonb('Data').notNullable();
		table.timestamp('OccurredAt', { useTz: true }).notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('es_Event');
}
