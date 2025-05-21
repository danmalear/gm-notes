import type { Knex } from 'knex';

export async function up(knex: Knex) {
	return knex.schema.createTable('CampaignTemplate', (table) => {
		table.uuid('CampaignTemplateId').primary().notNullable();
		table.string('Name', 63).nullable();
	});
}

export async function down(knex: Knex) {
	return knex.schema.dropTable('CampaignTemplate');
}
