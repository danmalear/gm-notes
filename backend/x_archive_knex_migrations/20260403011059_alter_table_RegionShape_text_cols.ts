import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('RegionShape', (table) => {
		table.text('ShapeType').notNullable().alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('RegionShape', (table) => {
		table.string('ShapeType').notNullable().alter();
	});
}
