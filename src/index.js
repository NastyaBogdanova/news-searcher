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

const url = `http://newsapi.org/v2/everything?` +
            `pageSize=100&` +
            `from=${dateFrom.toISOString()}&` +
            `sortBy=publishedAt&`;

const searchForm = new SearchInput(document.forms.search);
const newsApi = new NewsApi(url);
const newsCardList = new NewsCardList(document.querySelector(".news__list"));

searchForm.setValidateListener();
searchForm.setSumbitListener();

document.forms.search.addEventListener("submit", () => {
    event.preventDefault();
    if (document.forms.search.checkValidity()) {
        if (!(newsCardList.container.children.length === 0)) {
            console.log("удаляем предыдущие новости");
            localStorage.clear();
            document.querySelector(".news").classList.remove("news_is-opened");
            document.querySelector(".news__show-more").classList.remove("news__show-more_is-closed");
            while (newsCardList.container.firstChild) {
                newsCardList.container.removeChild(newsCardList.container.firstChild);
            }
        }
        document.querySelector(".not-found").classList.remove("not-found_is-opened");
        document.querySelector(".request-error").classList.remove("request-error_is-opened");
        document.querySelector(".preloader").classList.add("preloader_is-opened");

        fetch(url + `qInTitle=${input.value}&` + apiKey)
        .then((res) => {
            if (!res.ok) {
                document.querySelector(".preloader").classList.remove("preloader_is-opened");
              document.querySelector(".request-error").classList.add("request-error_is-opened");
                return Promise.reject(`Ошибка: ${res.status}`);
              }
              return res.json();
        })
        .then((result) => {
            document.querySelector(".preloader").classList.remove("preloader_is-opened");
            localStorage.setItem('news', JSON.stringify(result.articles));
            if (!(result.articles.length === 0)) {
                document.querySelector(".news").classList.add("news_is-opened");
                const articles = localStorage.getItem('news');
                const news = JSON.parse(articles);
                console.log(news);
                for(let i = 0; i < 3; i++) {
                    let item = news[i];
                    const newsCard = new NewsCard(item.url, item.urlToImage, item.publishedAt, item.title, item.description, item.source.name);
                    newsCardList.addNewsCard(newsCard.addData());
                    hideShowMoreButton(result.articles.length);
                }
                count = 3;
            } else {
                document.querySelector(".not-found").classList.add("not-found_is-opened");
            }
          })
          .catch((err) => {
              console.log(err);
            });
    } else {
        console.log("Нужно ввести ключевое слово");
    }
  });

const news = document.querySelector(".news");

function hideShowMoreButton(item) {
    if (item === newsCardList.container.children.length) {
        document.querySelector(".news__show-more").classList.add("news__show-more_is-closed");
    }
}

function func(arr){
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

news.querySelector(".news__show-more").addEventListener("click", () => {
    const articles = localStorage.getItem('news');
    const news = JSON.parse(articles);
        
    let arr = func(news);
    console.log(arr);
    arr.forEach(item => {
        const newsCard = new NewsCard(item.url, item.urlToImage, item.publishedAt, item.title, item.description, item.source.name);
        newsCardList.addNewsCard(newsCard.addData());
        hideShowMoreButton(news.length);
    });

});

//сохранять данные при возвращении на страницу