import "../pages/about/about.css";
import "../blocks/swiper/swiper-bundle.css";

import { GITHUB_URL } from "../js/constants/constants.js";
import { fixDate } from "../js/utils/utils.js";
import { CommitCard } from "../js/components/CommitCard.js";
import { CardList } from "../js/components/CardList.js";
import { GithubApi } from "../js/modules/GithubApi.js";
import { Block } from "../js/components/Block.js";
import Swiper, { Navigation, Pagination } from "swiper";

(function () {
Swiper.use([Navigation, Pagination]);

const commitCardList = new CardList(document.querySelector(".history__slides"));
const gitHubApi = new GithubApi(
  GITHUB_URL,
  renderCommitCards,
  swiperInit,
  openRequestError
);
const historySlider = new Block(
  document.querySelector(".history__slider"),
  "root__hide"
);
const requestError = new Block(
  document.querySelector(".request-error"),
  "root__hide"
);

function openRequestError() {
  historySlider.hide();
  requestError.open();
  document.querySelector(".history").style.paddingBottom = 0;
}

function renderCommitCards(arr) {
  arr.forEach((item) => {
    const commitCard = new CommitCard(
      fixDate,
      item.commit.author.name,
      item.commit.author.email,
      item.commit.author.date,
      item.commit.message,
      item.author.avatar_url
    );
    commitCardList.addCards(commitCard.addData());
  });
}

const mySwiper = new Swiper(".swiper-container", {
  spaceBetween: 16,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  init: false,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    dynamicBullets: true,
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function swiperInit() {
  mySwiper.init();
}

gitHubApi.getCommits();
})();