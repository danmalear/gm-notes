import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('Action', (table) => {
		table.uuid('ActionId').primary().notNullable();
		table.uuid('TargetId').notNullable();
		table.string('Name').notNullable();
		table.string('Type');
		table.uuid('NarrationId');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('Action');
}
