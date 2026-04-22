type TableColumnNames<TTableName extends string, TColNames extends string[]> = {
	[K in keyof TColNames]: `${TTableName}.${TColNames[K]}`;
};

export function tableColumns<
	TTableName extends string,
	TColNames extends string[],
>(
	tableName: TTableName,
	columnNames: TColNames,
): TableColumnNames<TTableName, TColNames> {
	return columnNames.map(
		(columnName) => `${tableName}.${columnName}`,
	) as TableColumnNames<TTableName, TColNames>;
}
