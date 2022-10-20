import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import markupTpl from '../templates/card-imageTpl.hbs';
import getRefs from './getRefs';
const axios = require('axios').default;

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

console.log(lightbox);

const refs = getRefs();

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.cardInPage = 40;
  }
  fetchArticles() {
    console.log(this);
    console.log(this.page);
    console.log(this.card);
    const _api = '11895846-ad52836a76344d5d3ed713379';
    const BASE_URL = `https://pixabay.com/api/?key=${_api}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    // const BASE_URL = `https://pixabay.com/api/`;

    getSearchResult(BASE_URL);
  }

  addFetchArticles() {
    const _api = '11895846-ad52836a76344d5d3ed713379';
    const BASE_URL = `https://pixabay.com/api/?key=${_api}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    getSearchCont(BASE_URL);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  pageCounter() {
    this.page += 1;
  }

  resetPages() {
    this.page = 1;
  }
}

async function getSearchResult(BASE_URL) {
  try {
    const response = await axios.get(BASE_URL);
    if (response.data.hits.length === 0) {
      refs.cardContainer.innerHTML = '';
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again. :('
      );
    } else {
      console.log(response);
      console.log(response.data.hits);
      console.log(response.data.totalHits);
      Notify.info(`Hooray! We found ${response.data.totalHits} images`);
      const markup = markupTpl(response.data.hits);
      refs.cardContainer.innerHTML = markup;
      lightbox.refresh();
    }
  } catch (error) {
    console.error(error);
  }
}

async function getSearchCont(BASE_URL) {
  try {
    const response = await axios.get(BASE_URL);
    console.log(response);
    console.log(response.data.hits);
    const markup = markupTpl(response.data.hits);
    refs.cardContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  } catch (error) {
    return Notify.failure(
      `We're sorry, but you've reached the end of search results. :(`
    );
    console.error(error);
  }
}

// , options
