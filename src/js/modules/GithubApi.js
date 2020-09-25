export class GithubApi {
  constructor(url, renderCallback, swiperCallback, errorCallback) {
    this.url = url;
    this.renderCallback = renderCallback;
    this.swiperCallback = swiperCallback;
    this.errorCallback = errorCallback;
  }

  getCommits() {
    return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          this.errorCallback();
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        this.renderCallback(result);
        this.swiperCallback();
      })
      .catch((err) => {
        console.log(err);
        this.errorCallback();
      });
  }
}