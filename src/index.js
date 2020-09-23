import "./pages/index/index.css";

import { API_KEY } from "./js/constants/api-key.js";
import { SEARCH_URL, NEWS_START_QUANTITY, THREE_NEWS } from "./js/constants/constants.js";
import { fixDate } from "./js/utils/utils.js";
import { SearchInput } from "./js/components/SearchInput.js";
import { NewsCard } from "./js/components/NewsCard.js";
import { CardList } from "./js/components/CardList.js";
import { NewsApi } from "./js/modules/NewsApi.js";
import { DataStorage } from "./js/modules/DataStorage.js";
import { ShowMoreButton } from "./js/components/ShowMoreButton.js";

(function () {
  const input = document.querySelector(".search__input");
  const searchButton = document.querySelector(".search__button");
  const preloader = document.querySelector(".preloader");
  const requestError = document.querySelector(".request-error");
  const newsBlock = document.querySelector(".news");
  const notFound = document.querySelector(".not-found");
  let newsCounter = NEWS_START_QUANTITY;

  const searchForm = new SearchInput(document.forms.search, searchFormSubmit);
  const newsApi = new NewsApi(SEARCH_URL, API_KEY, openRequestError, saveNewsInTitles);
  const newsCardList = new CardList(document.querySelector(".news__list"));
  const dataStorage = new DataStorage();
  const showMoreButton = new ShowMoreButton(
    newsBlock.querySelector(".news__show-more"),
    showMoreButtonClick,
    "news__show-more_is-closed"
  );

function handleSearchFormElements(boolean) {
  input.disabled = boolean;
  searchButton.disabled = boolean;
}

  function openRequestError() {
    preloader.classList.add("root__hide");
    handleSearchFormElements(false);
    requestError.classList.remove("root__hide");
  }

  function renderNewsCards(arr) {
    arr.forEach((item) => {
      const newsCard = new NewsCard(
        fixDate,
        item.url,
        item.urlToImage,
        item.publishedAt,
        item.title,
        item.description,
        item.source.name
      );
      newsCardList.addCards(newsCard.addData());
    });
  }

  function openNewsBlock() {
    newsBlock.classList.remove("root__hide");
  }

  function handleShowMoreButton(item) {
    if (item === newsCardList.container.children.length) {
      showMoreButton.hideButton();
    }
  }

  function searchFormSubmit() {
    if (document.forms.search.checkValidity()) {
      if (!(newsCardList.container.children.length === 0)) {
        dataStorage.clear();
        newsBlock.classList.add("root__hide");
        showMoreButton.openButton();
        newsCardList.removeCards();
      }

      notFound.classList.add("root__hide");
      requestError.classList.add("root__hide");
      preloader.classList.remove("root__hide");
      handleSearchFormElements(true);
      newsApi
        .getNews(input.value)
        .then((result) => {
          dataStorage.setItem("news", result.articles);
          dataStorage.setItem("input", input.value);
          dataStorage.setItem("totalResults", result.totalResults);
          preloader.classList.add("root__hide");
          handleSearchFormElements(false);
          if (!(result.articles.length === 0)) {
            const articles = dataStorage.getItem("news");
            const arr = articles.slice(0, NEWS_START_QUANTITY);
            newsCounter = NEWS_START_QUANTITY;
            dataStorage.setItem("newsList", arr);
            renderNewsCards(arr);
            handleShowMoreButton(articles.length);
            openNewsBlock();
            newsApi.getNewsInTitles(input.value);
          } else {
            notFound.classList.remove("root__hide");
          }
        })
        .catch((err) => {
          console.log(err);
          openRequestError();
          handleSearchFormElements(false);
        });
    } else {
      console.log("Нужно ввести ключевое слово");
    }
  }

  function showMoreNews(arr) {
    if (newsCounter < arr.length - (arr.length % THREE_NEWS)) {
      const output = [arr[newsCounter], arr[newsCounter + 1], arr[newsCounter + 2]];
      newsCounter = newsCounter + THREE_NEWS;
      return output;
    }

    if (arr.length % THREE_NEWS == 2) {
      return [arr[newsCounter], arr[newsCounter + 1]];
    }

    if (arr.length % THREE_NEWS == 1) {
      return [arr[newsCounter]];
    }
  }

  function showMoreButtonClick() {
    const articles = dataStorage.getItem("news");
    let arr = showMoreNews(articles);

    const newslist = dataStorage.getItem("newsList");

    arr.forEach((item) => {
      const newsCard = new NewsCard(
        fixDate,
        item.url,
        item.urlToImage,
        item.publishedAt,
        item.title,
        item.description,
        item.source.name
      );
      newsCardList.addCards(newsCard.addData());
      return newslist.push(item);
    });

    handleShowMoreButton(articles.length);
    dataStorage.setItem("newsList", newslist);
  }

  function renderLastSearchResults() {
    if (dataStorage.checkLocalStorage()) {
      const searchInput = dataStorage.getItem("input");
      input.value = searchInput;

      const newslist = dataStorage.getItem("newsList");
      renderNewsCards(newslist);

      openNewsBlock();

      const articles = dataStorage.getItem("news");
      handleShowMoreButton(articles.length);
    }
  }
  renderLastSearchResults();

  function saveNewsInTitles(item) {
    dataStorage.setItem("newsInTitles", item);
  }

  searchForm.setValidateListener();
  searchForm.setSumbitListener();
  showMoreButton.setClickListener();
})();
