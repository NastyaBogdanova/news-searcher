import "../pages/analytics/analytics.css";

import { changeTodayDate, firstLetterToUpperCase } from "../js/utils/utils.js";
import { DataStorage } from "../js/modules/DataStorage.js";
import { Statistics } from "../js/components/Statistics.js";

(function () {
  const title = document.querySelector(".info__news-name");
  const newsAtWeek = document.querySelector(".info__news-week");
  const newsInTitles = document.querySelector(".info__news-titles");
  const diagramDates = document.querySelectorAll(".diagram__date");
  const diagramPercents = document.querySelectorAll(".diagram__percent");
  const dataStorage = new DataStorage();

  const articles = dataStorage.getItem("news");

  const statistics = new Statistics(
    articles,
    diagramDates,
    diagramPercents,
    changeTodayDate
  );

  function renderTitle() {
    const input = dataStorage.getItem("input");
    title.textContent = firstLetterToUpperCase(input);
  }
  renderTitle();

  function renderNewsAtWeek() {
    const storageResults = dataStorage.getItem("totalResults");
    newsAtWeek.textContent = storageResults;
  }
  renderNewsAtWeek();

  function renderNewsInTitles() {
    const storageResults = dataStorage.getItem("newsInTitles");
    newsInTitles.textContent = storageResults;
  }
  renderNewsInTitles();

  statistics.markupPercents();
})();