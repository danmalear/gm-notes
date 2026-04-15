import knex from 'knex';
import configs from '../../knexfile.ts';

const env = process.env.NODE_ENV ?? 'development';

const config = configs[env];

export const db = knex(config);
