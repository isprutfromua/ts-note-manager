import { TKey } from '../types';

export interface INote {
  readonly key: TKey;
  title: string;
  content: string;
}
