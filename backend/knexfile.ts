import dotenv from 'dotenv';
import type { Knex } from 'knex';

dotenv.config();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			tableName: 'knex_migrations',
		},
	},

	preview: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
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
