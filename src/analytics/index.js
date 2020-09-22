import "../pages/analytics/analytics.css";

import { DataStorage } from "../js/modules/DataStorage.js";
import { Statistics } from "../js/components/Statistics.js";
import { title, newsAtWeek, newsInTitles, diagramDates, diagramPercents } from "../js/constants/analytics-constants.js";

(function () {
  const dataStorage = new DataStorage();

  const articles = dataStorage.getItem("news");
  const totalResults = dataStorage.getItem("totalResults");

  const statistics = new Statistics(
    articles,
    diagramDates,
    diagramPercents,
    totalResults
  );

  function renderTitle() {
    const input = dataStorage.getItem("input");
    title.textContent = input;
  }
  renderTitle();

  function renderNewsAtWeek() {
    const totalResults = dataStorage.getItem("totalResults");
    newsAtWeek.textContent = totalResults;
  }
  renderNewsAtWeek();

  function renderNewsInTitles() {
    const totalResults = dataStorage.getItem("newsInTitles");
    newsInTitles.textContent = totalResults;
  }
  renderNewsInTitles();

  statistics.markupPercents();
})();