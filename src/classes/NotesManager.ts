import { INotesManager, INote, IDataStorage, IDataEntry } from '../interfaces';
import { TCommands } from '../types';
import { dictionary as $t } from '../translations';

export class NotesManager implements INotesManager {
  private notes: INote[] = [];

  constructor(
    private noteEntry: IDataEntry,
    private noteStorage: IDataStorage<INote>
  ) {
    this.#loadNotes();
    this.#showWelcomeMessage();
    this.#handleUserInput();
  }

  async #handleUserInput(): Promise<void> {
    const command = await this.noteEntry.getData<TCommands>($t['enterCommand']);

    if (command) {
      this.#processCommand(command.trim().toLowerCase());
    } else {
      this.#exit();
    }
  }

  async #processCommand(command: string) {
    switch (command) {
      case TCommands.ADD:
        await this.addNote();
        break;
      case TCommands.VIEW:
        this.viewNotes();
        break;
      case TCommands.EXIT:
        this.#exit();
        break;
      default:
        console.log($t['wrongAction']);
    }

    this.#handleUserInput();
  }

  #showWelcomeMessage(): void {
    console.log('%c' + $t['welcome'], 'font-weight:medium;font-size:18px;font-family:"Arial"');
    console.log('%c' + $t['actions'], 'font-weight:regular;font-size:16px;font-family:"Arial"');
    console.log('%c' + $t['actionAdd'], 'font-weight:regular;font-size:14px;font-family:"Arial"');
    console.log('%c' + $t['actionView'], 'font-weight:regular;font-size:14px;font-family:"Arial"');
    console.log('%c' + $t['actionExit'], 'font-weight:regular;font-size:14px;font-family:"Arial"');
  }

  #loadNotes() {
    const notes = this.noteStorage.load();

    if (notes) {
      this.notes = [...notes];
    } else {
      alert($t['emptyData']);
    }
  }

  #makeNote(title: string, content: string): INote {
    return {
      key: Date.now(),
      title,
      content
    };
  }

  async #saveNote(note: INote): Promise<boolean> {
    this.notes.push(note);
    const status = this.noteStorage.save(this.notes);

    return status;
  }

  async addNote(): Promise<boolean> {
    const title = await this.noteEntry.getData<string>($t['enterTitle']);
    const content = await this.noteEntry.getData<string>($t['enterText']);

    if (!title || !content) {
      return false;
    }

    const note = this.#makeNote(title, content);
    const status = await this.#saveNote(note);

    // todo: move alert to separate class Logger or etc
    alert(status ? $t['saveSuccess'] : $t['saveError']);

    return status;
  }

  viewNotes() {
    const notes = this.noteStorage.load();

    if (notes?.length) {
      console.table(notes);
    } else {
      console.log($t['emptyData']);
    }
  }

  #exit() {
    this.notes = [];
    return false;
  }
}
