export class Statistics {
  constructor(articles, diagramDates, diagramPercents, callback) {
    this.articles = articles;
    this.diagramDates = diagramDates;
    this.diagramPercents = diagramPercents;
    this.callback = callback;
  }

  _fixDate(date) {
    const options = { day: "numeric" };
    const fixedDate = new Date(date).toLocaleString("ru-RU", options);
    return fixedDate;
  }

  _getWeekDay(date) {
    const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    return days[date.getDay()];
  }

  _filterDates(date) {
    const datesArr = this.articles.map(function (item) {
      return item.publishedAt.substr(0, 10);
    });
    const filteredDates = datesArr.filter(function (item) {
      return item === date;
    });
    return filteredDates;
  }

  _markupDates() {
    const dateFrom = this.callback();
    const percentArr = [];
    this.diagramDates.forEach((item) => {
      const fixedDate = this._fixDate(dateFrom);
      item.textContent = fixedDate + `, ${this._getWeekDay(dateFrom)}`;
      const filteredArr = this._filterDates(
        dateFrom.toISOString().substr(0, 10)
      );
      percentArr.push(filteredArr.length);
      dateFrom.setDate(dateFrom.getDate() + 1);
    });
    return percentArr;
  }

  markupPercents() {
    const percentArr = this._markupDates();
    for (let i = 0; i < percentArr.length; i++) {
      const percent = (percentArr[i] * 100) / this.articles.length;
      this.diagramPercents[i].textContent = Math.round(percent);
        this.diagramPercents[i].style.width = percent + "%";
      if (percent === 0) {
        this.diagramPercents[i].style.background = 'transparent';
      }
    }
  }
}