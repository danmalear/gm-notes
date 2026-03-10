import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Map', (table) => {
		table.integer('Width').notNullable().defaultTo(0);
		table.integer('Height').notNullable().defaultTo(0);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Map', (table) => {
		table.dropColumn('Width');
		table.dropColumn('Height');
	});
}
