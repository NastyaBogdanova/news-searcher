export class NewsApi {
    constructor(url, apiKey, callback) {
        this.url = url;
        this.apiKey = apiKey;
        this.callback = callback;
      }
    
      getNews(input) {
        return fetch(this.url + `qInTitle=${input}&` + this.apiKey)
        .then((res) => {
            if (!res.ok) {
              this.callback();
              return Promise.reject(`Ошибка: ${res.status}`);
              }
              return res.json();
        })
      }
}