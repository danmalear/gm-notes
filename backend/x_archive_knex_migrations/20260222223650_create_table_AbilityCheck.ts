import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('AbilityCheck', (table) => {
		table.uuid('AbilityCheckId').primary().notNullable();
		table.uuid('ActionId').notNullable();
		table.string('Skill').notNullable();
		table.integer('DC').notNullable();
		table.uuid('SuccessNarrationId');
		table.uuid('FailureNarrationId');
		table.uuid('CriticalSuccessNarrationId');
		table.uuid('CriticalFailureNarrationId');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('AbilityCheck');
}
