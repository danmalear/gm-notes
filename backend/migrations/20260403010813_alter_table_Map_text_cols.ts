import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Map', (table) => {
		table.text('Name').notNullable().alter();
		table.text('ImagePath').notNullable().alter();
		table
			.text('DefaultLighting')
			.notNullable()
			.defaultTo('Bright Light')
			.alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Map', (table) => {
		table.string('Name', 63).notNullable().alter();
		table.string('ImagePath').notNullable().alter();
		table
			.string('DefaultLighting')
			.notNullable()
			.defaultTo('Bright Light')
			.alter();
	});
}
