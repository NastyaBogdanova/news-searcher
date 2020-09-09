import "./pages/index/index.css";

import { SearchInput } from './js/components/SearchInput.js';
import { NewsCard } from './js/components/NewsCard.js';

const searchForm = new SearchInput(document.forms.search);

searchForm.setValidateListener();
searchForm.setSumbitListener();

