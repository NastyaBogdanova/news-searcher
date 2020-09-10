export class SearchInput {
    constructor(form) {
      this.form = form;
    }
  
    _validate(form) {
        const errorElem = form.lastElementChild;
        const errorMassage = "Нужно ввести ключевое слово";
      if (!form.checkValidity()) {
        errorElem.textContent = errorMassage;
      } else {
        errorElem.textContent = " ";
      }
    } // использовать эту функцию перед сабмитом. Если слово введено, осуществляется запрос к API. слово нужно передать в апи

    setValidateListener() {
        this.form.addEventListener("input", () => this._validate(this.form));
    }

    setSumbitListener() {
        this.form.addEventListener("submit", () => {
            event.preventDefault();
            this._validate(this.form);
        });
    }
    
}