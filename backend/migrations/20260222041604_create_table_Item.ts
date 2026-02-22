import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('Item', (table) => {
		table.uuid('ItemId').primary().notNullable();
		table.uuid('CampaignId');
		table.string('Name').notNullable();
		table.boolean('IsContainer').notNullable().defaultTo(false);
		table.integer('Value');
		table.string('ValueUnit', 2);
		table.string('DetailsLink');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('Item');
}
