export interface INotesManager {
  addNote(): Promise<boolean>;
  viewNotes(): void;
}
