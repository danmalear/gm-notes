import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('RegionTemplate', (table) => {
		table.uuid('RegionTemplateId').primary().notNullable();
		table.uuid('MapTemplateId').notNullable();
		table.string('Name', 63).notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('RegionTemplate');
}
