export interface Entity<TDto = unknown> {
	toDto(): TDto;
	save(): Promise<Entity>;
}
