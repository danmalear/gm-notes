import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('es_Command', (table) => {
		table.uuid('CommandId').primary().notNullable();
		table.uuid('AggregateId');
		table.uuid('CorrelationId').notNullable();
		table.string('Context').notNullable();
		table.string('Type').notNullable();
		table.json('Data').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('es_Command');
}
