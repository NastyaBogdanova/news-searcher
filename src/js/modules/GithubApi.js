export class GithubApi {
    constructor(callback) {
        this.callback = callback;
      }
  
    getCommits() {
      return fetch('https://api.github.com/repos/NastyaBogdanova/newssearcher/commits?per_page=20').then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        this.callback(result);
    })
    .catch((err) => console.log(err));
}
    }