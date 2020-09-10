export class NewsApi {
    constructor(url) {
        this.url = url;
      }
    
      getNews() {
        fetch(this.url).then((res) => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
              }
              console.log(res.json());
              return res.json();
        });
      }
}