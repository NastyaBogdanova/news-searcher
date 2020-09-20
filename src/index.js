import "./pages/index/index.css";

import { apiKey } from "./js/constants/api-key.js";
import { input, preloader, requestError, newsBlock, notFound, API_URL } from "./js/constants/index-constants.js";
import { renderNewsCards, openNewsBlock, handleShowMoreButton } from "./js/utils/utils.js";
import { SearchInput } from "./js/components/SearchInput.js";
import { NewsCard } from "./js/components/NewsCard.js";
import { NewsCardList } from "./js/components/NewsCardList.js";
import { NewsApi } from "./js/modules/NewsApi.js";
import { DataStorage } from "./js/modules/DataStorage.js";
import { ShowMoreButton } from "./js/components/ShowMoreButton.js";

(function () {
  const url =
    `${API_URL}/v2/everything?` +
    `pageSize=100&` +
    `from=${setDate()}&` +
    `sortBy=publishedAt&`;
  let count = 3;

  const searchForm = new SearchInput(document.forms.search, searchFormSubmit);
  const newsApi = new NewsApi(url, apiKey, openRequestError, saveNewsInTitles);
  const newsCardList = new NewsCardList(document.querySelector(".news__list"));
  const dataStorage = new DataStorage();
  const showMoreButton = new ShowMoreButton(
    newsBlock.querySelector(".news__show-more"),
    showMoreButtonClick
  );

  function openRequestError() {
    preloader.classList.remove("preloader_is-opened");
    requestError.classList.add("request-error_is-opened");
  }
  
  function renderNewsCards(arr) {
    arr.forEach((item) => {
      const newsCard = new NewsCard(
        item.url,
        item.urlToImage,
        item.publishedAt,
        item.title,
        item.description,
        item.source.name
      );
      newsCardList.addNewsCard(newsCard.addData());
    });
  }

  function openNewsBlock() {
    newsBlock.classList.add("news_is-opened");
  }

  function handleShowMoreButton(item) {
    if (item === newsCardList.container.children.length) {
      showMoreButton.hideButton();
    }
  }
  
  function setDate() {
    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);
    return dateFrom.toISOString();
  }

  function searchFormSubmit() {
    if (document.forms.search.checkValidity()) {
      if (!(newsCardList.container.children.length === 0)) {
        dataStorage.clear();
        newsBlock.classList.remove("news_is-opened");
        showMoreButton.openButton();
        newsCardList.removeCards();
      }

      notFound.classList.remove("not-found_is-opened");
      requestError.classList.remove("request-error_is-opened");
      preloader.classList.add("preloader_is-opened");

      newsApi
        .getNews(input.value)
        .then((result) => {
          dataStorage.setItem("news", result.articles);
          dataStorage.setItem("input", input.value);
          dataStorage.setItem("totalResults", result.totalResults);
          preloader.classList.remove("preloader_is-opened");
          if (!(result.articles.length === 0)) {
            const articles = dataStorage.getItem("news");
            const arr = articles.slice(0, 3);
            dataStorage.setItem("newsList", arr);
            renderNewsCards(arr);
            handleShowMoreButton(articles.length);
            openNewsBlock();
            count = 3;
            newsApi.getNewsInTitles(input.value);
          } else {
            notFound.classList.add("not-found_is-opened");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Нужно ввести ключевое слово");
    }
  }

  function showMoreNews(arr) {
    if (count < arr.length - (arr.length % 3)) {
      const output = [arr[count], arr[count + 1], arr[count + 2]];
      count = count + 3;
      return output;
    }

    if (arr.length % 3 == 2) {
      return [arr[count], arr[count + 1]];
    }

    if (arr.length % 3 == 1) {
      return [arr[count]];
    }
  }

  function showMoreButtonClick() {
    const articles = dataStorage.getItem("news");
    let arr = showMoreNews(articles);

    const newslist = dataStorage.getItem("newsList");

    arr.forEach((item) => {
      const newsCard = new NewsCard(
        item.url,
        item.urlToImage,
        item.publishedAt,
        item.title,
        item.description,
        item.source.name
      );
      newsCardList.addNewsCard(newsCard.addData());
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