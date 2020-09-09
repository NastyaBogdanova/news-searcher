export class NewsCard {
    constructor(link, image, date, name, text, source) {
      this.link = link;
      this.image = image;
      this.date = date;
      this.name = name;
      this.text = text;
      this.source = source;
    }
  
    __createMarkup() {
        const markup = `
        <a class="news__element" href="">
        <div class="news__element-container">
          <img class="news__image" src="" alt="Картинка новости">
          <p class="news__date"></p>
          <h3 class="news__name"></h3>
          <p class="news__text"></p>
        </div>
        <p class="news__source"></p>
      </a>
      `;

      const element = document.createElement('div');
      element.insertAdjacentHTML('afterbegin', markup);

      return element.firstElementChild;
    }

    addData() {
        const newsCard = __createMarkup();

        newsCard.querySelector(".news__element").href = this.link;
        newsCard.querySelector(".news__image").src = this.image;
        newsCard.querySelector(".news__date").textContent = this.date;
        newsCard.querySelector(".news__name").textContent = this.name;
        newsCard.querySelector(".news__text").textContent = this.text;
        newsCard.querySelector(".news__source").textContent = this.source;

        return newsCard;
    }
}