import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './dev.sqlite3',
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},

	preview: {
		client: 'sqlite3',
		connection: {
			filename: ':memory:',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},

	production: {
		client: 'sqlite3',
		connection: {
			filename: './data.sqlite3',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
};

export default config;
