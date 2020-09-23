export class ShowMoreButton {
    constructor(button, callback, className) {
      this.button = button;
      this.callback = callback;
      this.className = className;
    }
  
    hideButton() {
      this.button.classList.add(this.className);
    }
  
    openButton() {
      this.button.classList.remove(this.className);
    }
  
    setClickListener() {
      this.button.addEventListener("click", () => this.callback());
    }
  }

