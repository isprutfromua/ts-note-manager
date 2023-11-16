export interface IDataEntry {
  getData<T>(message?: string): Promise<T | null>;
}
