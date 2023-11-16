import { DataStorage } from '../abstractions';

export class LocalStorage<T> extends DataStorage<T> {
  constructor(private key: string) { super(); }
  save(data: T | T[]) {
    localStorage.setItem(this.key, JSON.stringify(data));

    return true;
  }

  load(): T[] | null {
    const storedData = localStorage.getItem(this.key);

    return storedData ? JSON.parse(storedData) : null;
  }
}
