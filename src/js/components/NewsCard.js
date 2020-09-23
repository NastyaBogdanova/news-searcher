export class NewsCard {
  constructor(callback, link, image, date, name, text, source) {
    this.callback = callback;
    this.link = link;
    this.image = image;
    this.date = date;
    this.name = name;
    this.text = text;
    this.source = source;
  }

  _createMarkup() {
    const markup = `
        <div class="news__element">
        <a class="news__link" href="#" target="_blank"></a>
        <div class="news__element-gradient"></div>
        <div class="news__element-container">
          <div class="news__image"></div>
          <p class="news__date"></p>
          <h3 class="news__name"></h3>
          <p class="news__text"></p>
        </div>
        <p class="news__source"></p>
      </div>
      `;

    const element = document.createElement("div");
    element.insertAdjacentHTML("afterbegin", markup);

    return element.firstElementChild;
  }

  _fixImage(url) {
    if(url === null) {
      return 'https://i.pinimg.com/originals/8a/eb/d8/8aebd875fbddd22bf3971c3a7159bdc7.png';
    } else {
      return url;
    }
  }

  addData() {
    const newsCard = this._createMarkup();

    newsCard.querySelector(".news__link").href = this.link;
    newsCard.querySelector(".news__image").style.backgroundImage = `url(${this._fixImage(this.image)})`;
    newsCard.querySelector(".news__date").textContent = this.callback(this.date);
    newsCard.querySelector(".news__name").textContent = this.name;
    newsCard.querySelector(".news__text").textContent = this.text;
    newsCard.querySelector(".news__source").textContent = this.source;

    return newsCard;
  }
}