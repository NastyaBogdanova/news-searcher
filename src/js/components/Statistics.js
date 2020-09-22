export class Statistics {
  constructor(articles, diagramDates, diagramPercents, totalResults) {
    this.articles = articles;
    this.diagramDates = diagramDates;
    this.diagramPercents = diagramPercents;
    this.totalResults = totalResults;
  }

  __changeTodayDate() {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);
    return dateFrom;
  }

  __fixDate(date) {
    const options = { day: "numeric" };
    const fixedDate = new Date(date).toLocaleString("ru-RU", options);
    return fixedDate;
  }

  __getWeekDay(date) {
    const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    return days[date.getDay()];
  }

  __filterDates(date) {
    const datesArr = this.articles.map(function (item) {
      return item.publishedAt.substr(0, 10);
    });
    const filteredDates = datesArr.filter(function (item) {
      return item === date;
    });
    return filteredDates;
  }

  __markupDates() {
    const dateFrom = this.__changeTodayDate();
    const percentArr = [];
    this.diagramDates.forEach((item) => {
      dateFrom.setDate(dateFrom.getDate() + 1);
      dateFrom.toISOString();
      const fixedDate = this.__fixDate(dateFrom);
      item.textContent = fixedDate + `, ${this.__getWeekDay(dateFrom)}`;
      const filteredArr = this.__filterDates(
        dateFrom.toISOString().substr(0, 10)
      );
      percentArr.push(filteredArr.length);
    });
    return percentArr;
  }

  markupPercents() {
    const percentArr = this.__markupDates();
    for (let i = 0; i < percentArr.length; i++) {
      const percent = (percentArr[i] * 100) / this.totalResults;
      this.diagramPercents[i].textContent = Math.round(percent);
      this.diagramPercents[i].style.width = percent + "%";
    }
  }
}