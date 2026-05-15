export abstract class Cloneable<T extends Cloneable<T>> {
	abstract clone(): T;
}
