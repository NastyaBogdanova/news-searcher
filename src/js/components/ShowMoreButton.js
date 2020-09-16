export class ShowMoreButton {
    constructor(button, callback) {
      this.button = button;
      this.callback = callback;
    }
  
    hideButton() {
      this.button.classList.add("news__show-more_is-closed");
    }
  
    openButton() {
      this.button.classList.remove("news__show-more_is-closed");
    }
  
    setClickListener() {
      this.button.addEventListener("click", () => this.callback());
    }
  }

