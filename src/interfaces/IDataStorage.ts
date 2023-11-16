export interface IDataStorage<T> {
  save(data: T | T[]): boolean;
  load(): T[] | null;
}
