export class NewsCard {
    constructor(link, image, date, name, text, source) {
      this.link = link;
      this.image = image;
      this.date = date;
      this.name = name;
      this.text = text;
      this.source = source;
    }
  
    createMarkup() {
        const markup = `
        <div class="news__element">
        <a class="news__link" href="#" target="_blank"></a>
        <div class="news__element-gradient"></div>
        <div class="news__element-container">
          <img class="news__image" src="" alt="Картинка новости">
          <p class="news__date"></p>
          <h3 class="news__name"></h3>
          <p class="news__text"></p>
        </div>
        <p class="news__source"></p>
      </div>
      `;

      const element = document.createElement('div');
      element.insertAdjacentHTML('afterbegin', markup);

      return element.firstElementChild;
    }

    __fixDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const newDate = new Date(date).toLocaleString('ru-RU', options);
      return newDate.slice(0, -2);
    }

    addData() {
        const newsCard = this.createMarkup();
        
        newsCard.querySelector(".news__link").href = this.link;
        newsCard.querySelector(".news__image").src = this.image;
        newsCard.querySelector(".news__date").textContent = this.__fixDate(this.date);
        newsCard.querySelector(".news__name").textContent = this.name;
        newsCard.querySelector(".news__text").textContent = this.text;
        newsCard.querySelector(".news__source").textContent = this.source;

        return newsCard;
    }
}