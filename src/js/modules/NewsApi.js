export class NewsApi {
  constructor(url, apiKey, callback, saveCallback) {
    this.url = url;
    this.apiKey = apiKey;
    this.callback = callback;
    this.saveCallback = saveCallback;
  }

  getNews(input) {
    return fetch(this.url + `q=${input}&` + this.apiKey).then((res) => {
      if (!res.ok) {
        this.callback();
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    });
  }
  
  getNewsInTitles(input) {
    return fetch(this.url + `qInTitle=${input}&` + this.apiKey).then((res) => {
      if (!res.ok) {
        this.callback();
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      this.saveCallback(result.totalResults);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}