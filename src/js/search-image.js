import getRefs from './getRefs';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import markupTpl from '../templates/card-imageTpl.hbs';
import SearchAPIServise from './AXIOS';

const refs = getRefs();
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
const searchApiServise = new SearchAPIServise();

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};
const callback = async function (entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting && entry.intersectionRect.bottom > 500) {
      searchApiServise.pageCounter();
      try {
        const { hits } = await searchApiServise.addFetchArticles();
        onLoad(hits, observer);
        lightbox.refresh();
      } catch (error) {}
    }
  });
};
const io = new IntersectionObserver(callback, options);

refs.inputFieldSearch.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  searchApiServise.resetPages();
  searchApiServise.query = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  try {
    const { hits, totalHits } = await searchApiServise.fetchArticles();
    if (hits.length === 0) {
      onClear();
    } else {
      Notify.info(`Hooray! We found ${totalHits} images`);
      searchApiServise.calculateTotalPages(totalHits);
      createMarkup(hits);
      lightbox.refresh();
    }
  } catch (error) {
    return Notify.failure(`${error} :(`);
  }
}

function onLoad(hits, observer) {
  const markup = markupTpl(hits);
  const gallery = refs.cardContainer.insertAdjacentHTML('beforeend', markup);
  const target = document.querySelector('.gallery__item:last-child');
  if (!searchApiServise.isShowLoadMore) {
    Notify.failure(
      `We're sorry, but you've reached the end of search results. :(`
    );
    observer.unobserve(entry.target);
  } else {
    io.observe(target);
  }

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2.5,
    behavior: 'smooth',
  });

  return gallery;
}

function createMarkup(hits) {
  const markup = markupTpl(hits);
  const gallery = (refs.cardContainer.innerHTML = markup);
  const target = document.querySelector('.gallery__item:last-child');
  if (searchApiServise.isShowLoadMore) {
    io.observe(target);
  }

  return gallery;
}

function onClear() {
  refs.cardContainer.innerHTML = '';
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again. :('
  );
}
