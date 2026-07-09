import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Map', (table) => {
		table.string('DefaultLighting').notNullable().defaultTo('Bright Light');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Map', (table) => {
		table.dropColumn('DefaultLighting');
	});
}
