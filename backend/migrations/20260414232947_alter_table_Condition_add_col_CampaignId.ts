import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Condition', (table) => {
		table.uuid('CampaignId');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('Condition', (table) => {
		table.dropColumn('CampaignId');
	});
}
