export class NewsCardList {
    constructor(container) {
        this.container = container;
      }
    
      addNewsCard(newsCard) {
        this.container.appendChild(newsCard);
      }

      removeCards() {
        while (this.container.firstChild) {
          this.container.removeChild(this.container.firstChild);
        }
      }

}