import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('RegionNarration', (table) => {
		table.uuid('RegionId').notNullable();
		table.uuid('NarrationId').notNullable();
		table.primary(['RegionId', 'NarrationId']);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('RegionNarration');
}
