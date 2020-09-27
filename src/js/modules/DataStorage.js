export class DataStorage {
  constructor(renderCallback, openCallback, buttonCallback, input) {
    this.renderCallback = renderCallback;
    this.openCallback = openCallback;
    this.buttonCallback = buttonCallback;
    this.input = input;
  }

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key) {
    const item = localStorage.getItem(key);
    const parsedItem = JSON.parse(item);
    return parsedItem;
  }

  clear() {
    localStorage.clear();
  }

  checkLocalStorage() {
    return localStorage.newsList;
  }
}