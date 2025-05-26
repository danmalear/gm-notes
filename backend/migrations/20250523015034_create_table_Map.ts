import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('Map', (table) => {
		table.uuid('MapId').primary().notNullable();
		table.uuid('CampaignId').notNullable();
		table.uuid('MapTemplateId').nullable();
		table.string('Name', 63).notNullable();
		table.string('ImagePath').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('Map');
}
