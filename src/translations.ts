interface IDictionary {
  [key: string]: string
}

export const dictionary: IDictionary = {
  actionAdd: '- "add" для додавання нової нотатки',
  actionExit: '- "exit" для виходу',
  enterCommand: 'Введіть команду: ',
  actionView: '- "view" для перегляду збережених нотаток',
  enterTitle: 'Введіть заголовок нотатки:',
  enterText: 'Введіть текст нотатки:',
  saveSuccess: 'Нотатка успішно збережена',
  saveError: 'Помилка при збереженні нотатки',
  emptyData: 'Немає збережених нотаток!',
  loadAll: 'Завантажити збережені нотатки?',
  welcome: 'Ласкаво просимо до консольного інструменту для нотаток!',
  actions: 'Доступні дії:',
  wrongAction: 'Невідома команда. Спробуйте ще раз.'
}