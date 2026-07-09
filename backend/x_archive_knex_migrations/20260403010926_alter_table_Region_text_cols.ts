import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Region', (table) => {
		table.text('Name').notNullable().alter();
		table.text('Lighting').notNullable().defaultTo('Default').alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Region', (table) => {
		table.string('Name', 63).notNullable().alter();
		table.string('Lighting').notNullable().defaultTo('Default').alter();
	});
}
