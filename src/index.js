import "./pages/index/index.css";

import { SearchInput } from './js/components/SearchInput.js';
import { NewsCard } from './js/components/NewsCard.js';
import { NewsCardList } from './js/components/NewsCardList.js';
import { NewsApi } from './js/modules/NewsApi.js';

let dateFrom = new Date();
const url = `http://newsapi.org/v2/everything?` +
            `pageSize=100&` +
            `qInTitle=Россия&` +
            `from=${dateFrom}&` +
            `to=${dateFrom.setDate(dateFrom.getDate() - 7)}&` +
            `apiKey=ead27f57ec814354b1e6703a20e7e9d7`;


const searchForm = new SearchInput(document.forms.search);
const newsApi = new NewsApi(url);
const newsCardList = new NewsCardList(document.querySelector(".news__list"));

searchForm.setValidateListener();
searchForm.setSumbitListener();

document.forms.search.addEventListener("submit", () => {
    event.preventDefault();
    if (document.forms.search.checkValidity()) {
        fetch(url)
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
              }
              return res.json();
        })
        .then((result) => {
            console.log(result.articles);
            result.articles.forEach((item) => {
                console.log(item.url);
                const newsCard = new NewsCard(item.url, item.urlToImage, item.publishedAt, item.title, item.description, item.source.name);
                newsCardList.addNewsCard(newsCard.addData());
                document.querySelector(".news").classList.add("news_is-opened");
            });
          })
          .catch((err) => console.log(err));
    } else {
        console.log("Нужно ввести ключевое слово");
    }
  });


