export class SearchInput {
  constructor(form, callback) {
    this.form = form;
    this.callback = callback;
  }

  _validate(form) {
    const errorElem = form.lastElementChild;
    const errorMassage = "Нужно ввести ключевое слово";
    if (!form.checkValidity()) {
      errorElem.textContent = errorMassage;
    } else {
      errorElem.textContent = " ";
    }
  }

  setValidateListener() {
    this.form.addEventListener("input", () => this._validate(this.form));
  }

  setSumbitListener() {
    this.form.addEventListener("submit", () => {
      event.preventDefault();
      this.callback();
    });
  }
}