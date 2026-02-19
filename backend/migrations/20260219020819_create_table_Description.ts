import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('Description', (table) => {
		table.uuid('DescriptionId').primary().notNullable();
		table.uuid('DescriptionTemplateId');
		table.uuid('ParentId').notNullable();
		table.string('Name').notNullable();
		table.string('Description').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('Description');
}
