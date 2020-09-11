import "./pages/index/index.css";

import {apiKey} from './js/constants/apiKey.js';
import { SearchInput } from './js/components/SearchInput.js';
import { NewsCard } from './js/components/NewsCard.js';
import { NewsCardList } from './js/components/NewsCardList.js';
import { NewsApi } from './js/modules/NewsApi.js';

let dateFrom = new Date();
dateFrom.setDate(dateFrom.getDate() - 7);

const input = document.querySelector(".search__input");


const url = `http://newsapi.org/v2/everything?` +
            `pageSize=100&` +
            `from=${dateFrom.toISOString()}&` +
            'sortBy=publishedAt&';

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
            document.querySelector(".news").classList.remove("news_is-opened");
        while (newsCardList.container.firstChild) {
            newsCardList.container.removeChild(newsCardList.container.firstChild);
        }
        }
        document.querySelector(".not-found").classList.remove("not-found_is-opened");
        document.querySelector(".preloader").classList.add("preloader_is-opened");

        fetch(url + `qInTitle=${input.value}&` + apiKey)
        .then((res) => {
            if (!res.ok) {
                console.log("открыть блок ошибки");
                return Promise.reject(`Ошибка: ${res.status}`);
              }
              return res.json();
        })
        .then((result) => {
            document.querySelector(".preloader").classList.remove("preloader_is-opened");
            if (!(result.articles.length === 0)) {
                result.articles.forEach((item) => {
                    const newsCard = new NewsCard(item.url, item.urlToImage, item.publishedAt, item.title, item.description, item.source.name);
                    newsCardList.addNewsCard(newsCard.addData());
                    document.querySelector(".news").classList.add("news_is-opened");
                });
            } else {
                document.querySelector(".not-found").classList.add("not-found_is-opened");
            }
          })
          .catch((err) => console.log(err));
    } else {
        console.log("Нужно ввести ключевое слово");
    }
  });


