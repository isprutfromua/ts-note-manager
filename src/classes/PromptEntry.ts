import { DataEntry } from '../abstractions';

export class PromptEntry extends DataEntry {
  async getData<T>(message?: string): Promise<T | null> {
    const data = prompt(message);

    if (data) {
      return data as T;
    }

    return null;
  }

  async getConfirmation(message?: string): Promise<boolean> {
    return confirm(message);
  }
}
