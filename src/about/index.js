import "../pages/about/about.css";
import "../blocks/glide/glide.core.css";

import { GITHUB_URL } from "../js/constants/constants.js";
import { fixDate } from "../js/utils/utils.js";
import { CommitCard } from "../js/components/CommitCard.js";
import { CardList } from "../js/components/CardList.js";
import { GithubApi } from "../js/modules/GithubApi.js";
import Glide from '@glidejs/glide'

const commitCardList = new CardList(document.querySelector(".glide__slides"));
const gitHubApi = new GithubApi(GITHUB_URL, renderCommitCards);

function renderCommitCards(arr) {
    arr.forEach(item => {
        const commitCard = new CommitCard(
            fixDate,
            item.commit.author.name,
            item.commit.author.email,
            item.commit.author.date,
            item.commit.message,
            item.author.avatar_url,
          );
          commitCardList.addCards(commitCard.addData());
    });
}

gitHubApi.getCommits();
console.log(commitCardList);

const glide = new Glide('.glide', {
    type: 'slider',
    startAt: 0,
    focusAt: 0,
    perView: 3,
    peek: 88,
    braekpoints: {
      
    }
  });

glide.mount();
  
