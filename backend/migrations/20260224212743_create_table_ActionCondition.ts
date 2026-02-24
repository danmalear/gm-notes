import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return await knex.schema.createTable('ActionCondition', (table) => {
		table.uuid('ActionId').notNullable();
		table.uuid('ConditionId').notNullable();
		table.primary(['ActionId', 'ConditionId']);
	});
}

export async function down(knex: Knex): Promise<void> {
	return await knex.schema.dropTable('ActionCondition');
}
