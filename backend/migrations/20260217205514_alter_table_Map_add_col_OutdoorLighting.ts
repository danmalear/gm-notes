import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Map', (table) => {
		table.string('OutdoorLighting');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Map', (table) => {
		table.dropColumn('OutdoorLighting');
	});
}
