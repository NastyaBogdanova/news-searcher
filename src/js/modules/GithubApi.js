export class GithubApi {
    constructor(url, callback) {
        this.url = url;
        this.callback = callback;
      }

    openRequestError() {
        const requestError = document.querySelector(".request-error");
        requestError.classList.add("request-error_is-opened");
      }

    getCommits() {
      return fetch(this.url).then((res) => {
        if (!res.ok) {
          this.openRequestError();
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        this.callback(result);
    })
    .catch((err) => {
      console.log(err)
      this.openRequestError();
    });
}
    }