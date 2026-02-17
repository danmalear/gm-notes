import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Region', (table) => {
		table.string('Lighting').notNullable().defaultTo('Default');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Region', (table) => {
		table.dropColumn('Lighting');
	});
}
