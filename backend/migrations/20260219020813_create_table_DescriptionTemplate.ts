import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('DescriptionTemplate', (table) => {
		table.uuid('DescriptionTemplateId').primary().notNullable();
		table.uuid('ParentTemplateId');
		table.string('Name').notNullable();
		table.string('Description').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('DescriptionTemplate');
}
