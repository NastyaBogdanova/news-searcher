import "../pages/about/about.css";
import "../blocks/glide/glide.core.css";

import { CommitCard } from "../js/components/CommitCard.js";
import { CommitCardList } from "../js/components/CommitCardList.js";
import { GithubApi } from "../js/modules/GithubApi.js";
import Glide from '@glidejs/glide'

const commitCardList = new CommitCardList(document.querySelector(".glide__slides"));
const gitHubApi = new GithubApi(renderCommitCards);

function renderCommitCards(arr) {
    arr.forEach(item => {
        const commitCard = new CommitCard(
            item.commit.author.name,
            item.commit.author.email,
            item.commit.author.date,
            item.commit.message,
            item.author.avatar_url,
          );
          commitCardList.addCommitCard(commitCard.addData());
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
  
