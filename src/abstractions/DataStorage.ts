import { IDataStorage } from '../interfaces';

export abstract class DataStorage<T> implements IDataStorage<T> {
  abstract save(data: T | T[]): boolean;
  abstract load(): T[] | null;
}
