export class CardList {
    constructor(container) {
      this.container = container;
    }
  
    addCards(card) {
      this.container.appendChild(card);
    }
  
    removeCards() {
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
    }
  }