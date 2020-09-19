export class CommitCardList {
    constructor(container) {
      this.container = container;
    }
  
    addCommitCard(commitCard) {
      this.container.appendChild(commitCard);
    }
  
    removeCards() {
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
    }
  }