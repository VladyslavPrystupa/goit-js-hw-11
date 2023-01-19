import Notiflix from 'notiflix';
import { fetchImg } from './fetch';
import { markup } from './markup';
import { refs } from './refs';
const axios = require('axios').default;
let page = 1;
let totalImg = 0; /*  для відсілдковування загальної к-сті картинок, щоб прибрати кнопку load more */

refs.form.addEventListener('submit', onSubmit);
refs.moreBtn.addEventListener('click', loadMore);

async function onSubmit(evt) {
  evt.preventDefault();
  const value = refs.form.elements.searchQuery.value;
  page = 1;
  totalImg = 0; // для скидання загальної к-сті картинок при новому запиті(без перезавантаженн сторінки)

  const data = await fetchImg(value, page);

  totalImg += data.hits.length; // додаємо перші картинки на сторінці

  if (data.hits.length === 0) {
    refs.moreBtn.hidden = true;
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    refs.moreBtn.hidden = false;
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }

  if (totalImg === data.totalHits) {
    refs.moreBtn.hidden = true;
  } // якшо при першому запиті картинки поміщаються на одну сторінку то прибираємо кнопку

  return (refs.gallery.innerHTML = markup(data.hits));
}

async function loadMore() {
  page += 1;
  const value = refs.form.elements.searchQuery.value;

  const newImg = await fetchImg(value, page);

  totalImg += newImg.hits.length; // додаємо до загальної к-сті нові дозавантажені картинки

  if (totalImg === newImg.totalHits) {
    refs.moreBtn.hidden = true;
  } // якшо на сторінці відображені всі можливі картнки

  return refs.gallery.insertAdjacentHTML('beforeend', markup(newImg.hits));
}
