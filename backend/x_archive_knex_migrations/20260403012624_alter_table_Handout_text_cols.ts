import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Handout', (table) => {
		table.text('Name').notNullable().alter();
		table.text('Type').notNullable().alter();
		table.text('Source').notNullable().alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Handout', (table) => {
		table.string('Name').notNullable().alter();
		table.string('Type').notNullable().alter();
		table.string('Source').notNullable().alter();
	});
}
