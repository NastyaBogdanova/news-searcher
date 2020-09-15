import "./pages/index/index.css";

import { apiKey } from './js/constants/apiKey.js';
import { SearchInput } from './js/components/SearchInput.js';
import { NewsCard } from './js/components/NewsCard.js';
import { NewsCardList } from './js/components/NewsCardList.js';
import { NewsApi } from './js/modules/NewsApi.js';
import { DataStorage } from './js/modules/DataStorage.js';

let dateFrom = new Date();
dateFrom.setDate(dateFrom.getDate() - 7);

let count = 3;

const input = document.querySelector(".search__input");
const preloader = document.querySelector(".preloader");
const requestError = document.querySelector(".request-error");
const newsBlock = document.querySelector(".news");
const showMoreButton = newsBlock.querySelector(".news__show-more");
const notFound = document.querySelector(".not-found");

function openRequestError() {
    preloader.classList.remove("preloader_is-opened");
    requestError.classList.add("request-error_is-opened");
}
function openNewsBlock() {
    newsBlock.classList.add("news_is-opened");
}

function renderNewsCards(arr) {
    arr.forEach(item => {
        const newsCard = new NewsCard(item.url, item.urlToImage, item.publishedAt, item.title, item.description, item.source.name);
        newsCardList.addNewsCard(newsCard.addData());
    });
}

function handleShowMoreButton(item) {
    if (item === newsCardList.container.children.length) {
        showMoreButton.classList.add("news__show-more_is-closed");
    }
}

function showMoreNews(arr){
    if  (count  < arr.length - (arr.length % 3) ) {
        const output = [arr[count],arr[count+1],arr[count+2]]
        count = count + 3;
        console.log(count);
        return(output);
    }

    if (arr.length % 3 == 2) {
        return([arr[count],arr[count+1]]);
    }

    if (arr.length % 3 == 1) {
        return([arr[count]]);
    }
}

const url = `http://newsapi.org/v2/everything?` +
            `pageSize=100&` +
            `from=${dateFrom.toISOString()}&` +
            `sortBy=publishedAt&`;

const searchForm = new SearchInput(document.forms.search);
const newsApi = new NewsApi(url, apiKey, openRequestError);
const newsCardList = new NewsCardList(document.querySelector(".news__list"));
const dataStorage = new DataStorage(renderNewsCards, openNewsBlock, handleShowMoreButton);

searchForm.setValidateListener();
searchForm.setSumbitListener();
dataStorage.render();

document.forms.search.addEventListener("submit", () => {
    event.preventDefault();
    if (document.forms.search.checkValidity()) {

        if (!(newsCardList.container.children.length === 0)) {
            dataStorage.clear();
            newsBlock.classList.remove("news_is-opened");
            showMoreButton.classList.remove("news__show-more_is-closed");
            newsCardList.removeCards();
        }

        notFound.classList.remove("not-found_is-opened");
        requestError.classList.remove("request-error_is-opened");
        preloader.classList.add("preloader_is-opened");

        newsApi.getNews(input.value)

        .then((result) => {
            dataStorage.setItem('news', result.articles);
            preloader.classList.remove("preloader_is-opened");
            if (!(result.articles.length === 0)) {
                const articles = dataStorage.getItem('news');
                const arr = articles.slice(0, 3);
                dataStorage.setItem('newsList', arr);
                renderNewsCards(arr);
                handleShowMoreButton(articles.length);
                openNewsBlock();
                count = 3;
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
  });

showMoreButton.addEventListener("click", () => {
    const articles = dataStorage.getItem('news');
    let arr = showMoreNews(articles);

    const newslist = dataStorage.getItem('newsList');

    arr.forEach(item => {
        const newsCard = new NewsCard(item.url, item.urlToImage, item.publishedAt, item.title, item.description, item.source.name);
        newsCardList.addNewsCard(newsCard.addData());
        return newslist.push(item);
    });
    
    handleShowMoreButton(articles.length);
    dataStorage.setItem('newsList', newslist);
});

//поля формы заблокированы во время отправки запросов
//поле запроса отображается при перезагрузке