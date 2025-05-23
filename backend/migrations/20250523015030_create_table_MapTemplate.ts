import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('MapTemplate', (table) => {
		table.uuid('MapTemplateId').primary().notNullable();
		table.uuid('CampaignTemplateId').nullable();
		table.string('Name', 63).notNullable();
		table.string('ImagePath').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('MapTemplate');
}
