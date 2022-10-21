import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`;

axios.defaults.baseURL = BASE_URL;

export default class NewApiService {
  #page = 1;
  #searchQuery = '';
  #api = '11895846-ad52836a76344d5d3ed713379';
  #image_type = 'photo';
  #orientation = 'horizontal';
  #safesearch = 'true';
  #per_page = '40';
  #totalPages = 0;
  constructor() {}

  async fetchArticles() {
    const urlAXIOS = `?key=${this.#api}&q=${this.#searchQuery}&page=${
      this.#page
    }&image_type=${this.#image_type}&orientation=${
      this.#orientation
    }&safesearch=${this.#safesearch}&per_page=${this.#per_page}`;
    const { data } = await axios.get(urlAXIOS);
    return data;
  }

  async addFetchArticles() {
    const urlAXIOS = `?key=${this.#api}&q=${this.#searchQuery}&page=${
      this.#page
    }&image_type=${this.#image_type}&orientation=${
      this.#orientation
    }&safesearch=${this.#safesearch}&per_page=${this.#per_page}`;
    const { data } = await axios.get(urlAXIOS);
    return data;
  }

  get query() {
    return this.#searchQuery;
  }

  set query(newQuery) {
    this.#searchQuery = newQuery;
  }

  pageCounter() {
    this.#page += 1;
  }

  resetPages() {
    this.#page = 1;
  }

  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / this.#per_page);
  }

  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }
}
