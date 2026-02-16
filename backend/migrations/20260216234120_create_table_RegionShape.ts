import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('RegionShape', (table) => {
		table.uuid('RegionShapeId').primary().notNullable();
		table.uuid('RegionId').notNullable();
		table.string('ShapeType').notNullable();
		table.json('Coords').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('RegionShape');
}
