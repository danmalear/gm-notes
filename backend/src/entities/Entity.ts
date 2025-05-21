export interface Entity<TDto = unknown> {
	toDto(): TDto;
}
