import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return await knex.schema.createTable('RegionHandout', (table) => {
		table.uuid('RegionId').notNullable();
		table.uuid('HandoutId').notNullable();
		table.primary(['RegionId', 'HandoutId']);
	});
}

export async function down(knex: Knex): Promise<void> {
	return await knex.schema.dropTable('RegionHandout');
}
