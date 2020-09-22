const input = document.querySelector(".search__input");
const preloader = document.querySelector(".preloader");
const requestError = document.querySelector(".request-error");
const newsBlock = document.querySelector(".news");
const notFound = document.querySelector(".not-found");

const API_URL =
  NODE_ENV === "production" ? "https://nomoreparties.co/news" : "https://newsapi.org";

export { input, preloader, requestError, newsBlock, notFound, API_URL };