import getRefs from './getRefs';
import SearchAPIServise from './search-API';
const refs = getRefs();

console.log(refs);
refs.inputFieldSearch.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('submit', onLoad);

refs.loadBtn.addEventListener('click', onLoad);

const searchApiServise = new SearchAPIServise();

function onSearch(e) {
  e.preventDefault();

  console.log(e.currentTarget.elements.searchQuery.value);
  searchApiServise.resetPages();
  searchApiServise.query = e.currentTarget.elements.searchQuery.value;

  searchApiServise.fetchArticles();
}

function onLoad(e) {
  e.preventDefault();
  console.log(e);
  searchApiServise.pageCounter();
  searchApiServise.addFetchArticles();
}
