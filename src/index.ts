import type { INote } from './interfaces'
import { LocalStorage, NotesManager, PromptEntry } from './classes'

const notesStorage = new LocalStorage<INote>('notes')
const dataEntry = new PromptEntry()

const notesManager = new NotesManager(dataEntry, notesStorage)


