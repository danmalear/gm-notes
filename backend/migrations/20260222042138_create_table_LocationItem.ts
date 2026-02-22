import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('LocationItem', (table) => {
		table.uuid('LocationItemId').primary().notNullable();
		table.uuid('LocationId').notNullable();
		table.uuid('ItemId').notNullable();
		table.integer('Quantity').notNullable().defaultTo(1);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('LocationItem');
}
