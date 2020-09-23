export class CommitCard {
    constructor(callback, name, mail, date, message, image) {
        this.callback = callback;
        this.name = name;
        this.mail = mail;
        this.date = date;
        this.message = message;
        this.image = image;
      }
    
      _createMarkup() {
        const markup = `
        <li class="history__slide glide__slide">
        <div class="history__commit">
          <p class="history__commit-date"></p>
          <div class="history__author-profile">
            <img class="history__author-photo" src="" alt="Фото автора">
            <div class="history__author-sourse">
              <h3 class="history__author-name"></h3>
              <p class="history__author-mail"></p>
            </div>
          </div>
          <p class="history__commit-text"></p>
        </div>
      </li>
          `;
    
        const element = document.createElement("div");
        element.insertAdjacentHTML("afterbegin", markup);
    
        return element.firstElementChild;
      }
    
      addData() {
        const commitCard = this._createMarkup();
    
        commitCard.querySelector(".history__commit-date").textContent = this.callback(this.date);
        commitCard.querySelector(".history__author-photo").src = this.image;
        commitCard.querySelector(".history__author-name").textContent = this.name;
        commitCard.querySelector(".history__author-mail").textContent = this.mail;
        commitCard.querySelector(".history__commit-text").textContent = this.message;
    
        return commitCard;
      }
  }