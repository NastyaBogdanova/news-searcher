import "../pages/analytics/analytics.css";

import { DataStorage } from "../js/modules/DataStorage.js";
import { Statistics } from "../js/components/Statistics.js";

const title = document.querySelector(".info__news-name");
const dates = document.querySelectorAll(".diagram__date");
const newsAtWeek = document.querySelector(".info__news-week");
const newsInTitles = document.querySelector(".info__news-titles");

const dataStorage = new DataStorage();

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

let todayDate = new Date();

function setDate() {
    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);
    return dateFrom;
  }
  
  let dateFrom = setDate();

  function fixDate(date) {
    const options = { day: "numeric" };
    const newDate = new Date(date).toLocaleString("ru-RU", options);
    return newDate;
  }

  function getWeekDay(date) {
    let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  
    return days[date.getDay()];
  }

  function markupDates() {
    dates.forEach((item) => {
    dateFrom.setDate(dateFrom.getDate() + 1);
    dateFrom.toISOString();
const fixedDate = fixDate(dateFrom);
        item.textContent = fixedDate + `, ${getWeekDay(dateFrom)}`;
    })
  }
  markupDates();

  
  