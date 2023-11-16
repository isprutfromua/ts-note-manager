import { dictionary as $t } from './translations'

type TKey = number
enum TCommands {
  VIEW = 'view',
  EXIT = 'exit',
  ADD = 'add'
}

interface INote {
  readonly key: TKey
  title: string
  content: string
}

interface IDataStorage<T> {
  save(data: T | T[]): boolean
  load(): T[] | null
}

interface IDataEntry {
  getData<T>(message?: string): Promise<T | null>
}

interface INotesManager {
  addNote(): Promise<boolean>
  viewNotes(): void
}

abstract class DataEntry implements IDataEntry {
  abstract getData<T>(message?: string): Promise<T | null>
}

abstract class DataStorage<T> implements IDataStorage<T> {
  abstract save(data: T | T[]): boolean
  abstract load(): T[] | null
}

class LocalStorage<T> extends DataStorage<T> {
  constructor(private key: string) { super() }
  save(data: T | T[]) {
    localStorage.setItem(this.key, JSON.stringify(data));

    return true
  }

  load(): T[] | null {
    const storedData = localStorage.getItem(this.key);

    return storedData ? JSON.parse(storedData) : null;
  }
}

class PromptEntry extends DataEntry {
  async getData<T>(message?: string): Promise<T | null> {
    const data = prompt(message);

    if (data) {
      return data as T
    }

    return null
  }

  async getConfirmation(message?: string): Promise<boolean> {
    return confirm(message)
  }
}

class NotesManager implements INotesManager {
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
      this.#exit()
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

    this.#handleUserInput()
  }

  #showWelcomeMessage(): void {
    console.log('%c' + $t['welcome'], 'font-weight:medium;font-size:18px;font-family:"Arial"');
    console.log('%c' + $t['actions'], 'font-weight:regular;font-size:16px;font-family:"Arial"');
    console.log('%c' + $t['actionAdd'], 'font-weight:regular;font-size:14px;font-family:"Arial"');
    console.log('%c' + $t['actionView'], 'font-weight:regular;font-size:14px;font-family:"Arial"');
    console.log('%c' + $t['actionExit'], 'font-weight:regular;font-size:14px;font-family:"Arial"');
  }

  #loadNotes() {
    const notes = this.noteStorage.load()

    if (notes){
      this.notes = [...notes]
    } else {
      alert($t['emptyData'])
    }
  }
  
  #makeNote(title: string, content: string): INote {
    return {
      key: Date.now(),
      title,
      content
    }
  }

  async #saveNote(note: INote): Promise<boolean> {
    this.notes.push(note)
    const status = this.noteStorage.save(this.notes)

    return status
  }

  async addNote(): Promise<boolean> {
    const title = await this.noteEntry.getData<string>($t['enterTitle'])
    const content = await this.noteEntry.getData<string>($t['enterText'])

    if (!title || !content) {
      return false
    }

    const note = this.#makeNote(title, content)
    const status = await this.#saveNote(note)

    // todo: move alert to separate class Logger or etc
    alert(status ? $t['saveSuccess'] : $t['saveError'])

    return status
  }

  viewNotes() {
    const notes = this.noteStorage.load()

    if (notes?.length) {
      console.table(notes)
    } else {
      console.log($t['emptyData'])
    }
  }

  #exit() {
    this.notes = []
    return false
  }
}

const notesStorage = new LocalStorage<INote>('notes')
const dataEntry = new PromptEntry()


const notesManager = new NotesManager(dataEntry, notesStorage)


