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

  render() {
    if (localStorage.newsList) {
      const searchInput = this.getItem("input");
      this.input.value = searchInput;

      const newslist = this.getItem("newsList");
      this.renderCallback(newslist);

      this.openCallback();

      const articles = this.getItem("news");
      this.buttonCallback(articles.length);
    }
  }
}