import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('Region', (table) => {
		table.uuid('RegionId').primary().notNullable();
		table.uuid('RegionTemplateId').nullable();
		table.uuid('MapId').notNullable();
		table.string('Name', 63).notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('Region');
}
