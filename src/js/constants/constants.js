import { changeTodayDate } from "../utils/utils.js";

const API_URL = NODE_ENV === "production" ? "https://nomoreparties.co/news" : "https://newsapi.org";
const PAGES_QUANTITY = 100;
const COMMIT_PAGES_QUANTITY = 20;
const NEWS_START_QUANTITY = 3;
const THREE_NEWS = 3;
const SEARCH_URL =
    `${API_URL}/v2/everything?` +
    `pageSize=${PAGES_QUANTITY}&` +
    `from=${changeTodayDate().toISOString()}&` +
    `sortBy=publishedAt&`;
const GITHUB_URL = `https://api.github.com/repos/NastyaBogdanova/newssearcher/commits?per_page=${COMMIT_PAGES_QUANTITY}`;



export { SEARCH_URL, NEWS_START_QUANTITY, THREE_NEWS, GITHUB_URL };