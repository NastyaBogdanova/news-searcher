import "../pages/analytics/analytics.css";

import { DataStorage } from "../js/modules/DataStorage.js";
import { Statistics } from "../js/components/Statistics.js";

const title = document.querySelector(".info__news-name");
const dates = document.querySelectorAll(".diagram__date");
const newsAtWeek = document.querySelector(".info__news-week");
const newsInTitles = document.querySelector(".info__news-titles");
const diagramPercents = document.querySelectorAll(".diagram__percent");

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

function changeDate() {
    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);
    return dateFrom;
  }
  
  let dateFrom = changeDate();

  function fixDate(date) {
    const options = { day: "numeric" };
    const newDate = new Date(date).toLocaleString("ru-RU", options);
    return newDate;
  }

  function getWeekDay(date) {
    let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  
    return days[date.getDay()];
  }

  function filerDates(date) {
    const articles = dataStorage.getItem("news");
    const datesArr = articles.map(function (item) {
      return item.publishedAt.substr(0,10);
    });
  
  const dates = datesArr.filter(function (item) {
    return item === date; 
  });
  return dates;
  }

  function markupDates() {
    const percentArr = [];
    console.log(dates);
    dates.forEach((item) => {
    dateFrom.setDate(dateFrom.getDate() + 1);
    console.log(dateFrom);
    dateFrom.toISOString();
    const fixedDate = fixDate(dateFrom);
    item.textContent = fixedDate + `, ${getWeekDay(dateFrom)}`;
    const filteredArr = filerDates(dateFrom.toISOString().substr(0, 10));
    percentArr.push(filteredArr.length);
    })
  return percentArr;
  } 

  function markupPercent() {
    const totalResults = dataStorage.getItem("totalResults");
    const percentArr =  markupDates();
    for (let i = 0; i < percentArr.length; i++) {
      const percent = (percentArr[i] * 100) / totalResults;
      diagramPercents[i].textContent = Math.round(percent);
      diagramPercents[i].style.width = percent + '%';
    }
  }
  markupPercent();
 
  