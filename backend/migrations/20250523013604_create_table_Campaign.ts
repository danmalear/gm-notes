import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('Campaign', (table) => {
		table.uuid('CampaignId').primary().notNullable();
		table.uuid('CampaignTemplateId').nullable();
		table.string('Name', 63).notNullable();
		table.uuid('ActiveMapId').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('Campaign');
}
