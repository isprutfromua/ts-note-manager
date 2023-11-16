import { IDataEntry } from '../interfaces';

export abstract class DataEntry implements IDataEntry {
  abstract getData<T>(message?: string): Promise<T | null>;
}
