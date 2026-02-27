import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('Handout', (table) => {
		table.uuid('HandoutId').primary().notNullable();
		table.uuid('CampaignId').notNullable();
		table.string('Name').notNullable();
		table.string('Type').notNullable();
		table.string('Source').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('Handout');
}
