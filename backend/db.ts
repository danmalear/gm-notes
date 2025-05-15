import { Sequelize } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';

export const db = new Sequelize({
	dialect: SqliteDialect,
	storage: ':memory:',
});
