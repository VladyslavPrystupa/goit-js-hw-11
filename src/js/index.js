// import Notiflix from 'notiflix';
// import { fetchImg } from './fetch';
// import { markup } from './markup';
// import { refs } from './refs';

// let page = 1;
// let totalImg = 0; /*  для відсілдковування загальної к-сті картинок, щоб прибрати кнопку load more */

// refs.form.addEventListener('submit', onSubmit);
// refs.moreBtn.addEventListener('click', loadMore);

// async function onSubmit(evt) {
//   try {
//     evt.preventDefault();
//     const value = refs.form.elements.searchQuery.value;
//     page = 1;
//     const data = await fetchImg(value, page);
//     totalImg = 0; // для скидання загальної к-сті картинок при новому запиті(без перезавантаженн сторінки)
//     totalImg += data.hits.length; // додаємо перші картинки на сторінці
//     if (value === '') {
//       return Notiflix.Notify.failure('Please enter your search query.');
//     }
//     if (data.hits.length === 0) {
//       refs.moreBtn.hidden = true;
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     } else {
//       refs.moreBtn.hidden = false;
//       Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//     }
//     if (totalImg === data.totalHits) {
//       refs.moreBtn.hidden = true;
//     } // якшо при першому запиті картинки поміщаються на одну сторінку то прибираємо кнопку
//     return (refs.gallery.innerHTML = markup(data.hits));
//   } catch (error) {
//     console.log(error);
//     throw new Error(
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       )
//     );
//   }
// }

// async function loadMore() {
//   try {
//     page += 1;
//     const value = refs.form.elements.searchQuery.value;
//     const newImg = await fetchImg(value, page);

//     totalImg += newImg.hits.length; // додаємо до загальної к-сті нові дозавантажені картинки

//     if (totalImg === newImg.totalHits) {
//       refs.moreBtn.hidden = true;
//       Notiflix.Notify.info(`You have got all avaiable images.`);
//     } // якшо на сторінці відображені всі можливі картнки

//     return refs.gallery.insertAdjacentHTML('beforeend', markup(newImg.hits));
// } catch (error) {
// console.log(error);
//     throw new Error(
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       )
//     );
//   }
// }

import Notiflix from 'notiflix';
import { fetchImg } from './fetch';
import { markup } from './markup';
import { refs } from './refs';

let page = 1;
let totalImg = 0; /*  для відсілдковування загальної к-сті поточних картинок, щоб прибрати кнопку load more */

refs.form.addEventListener('submit', onSubmit);
refs.moreBtn.addEventListener('click', loadMore);

function onSubmit(evt) {
  evt.preventDefault();
  const value = refs.form.elements.searchQuery.value;

  return fetchImg(value, page)
    .then(data => {
      page = 1;
      totalImg = 0; // для скидання загальної к-сті картинок при новому запиті(без перезавантаженн сторінки)
      totalImg += data.hits.length;

      if (value === '') {
        return Notiflix.Notify.failure('Please enter your search query.');
      }

      if (data.hits.length === 0) {
        hideBtn();
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        showBtn();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      } // додаємо перші картинки на сторінці

      if (totalImg === data.totalHits) {
        hideBtn();
      } // якшо при першому запиті картинки поміщаються на одну сторінку то прибираємо кнопку

      return (refs.gallery.innerHTML = markup(data.hits));
    })
    .catch(err => {
      error(err);
    });
}

function loadMore() {
  const value = refs.form.elements.searchQuery.value;
  page += 1;

  return fetchImg(value, page)
    .then(data => {
      totalImg += data.hits.length; // додаємо до загальної к-сті нові дозавантажені картинки

      if (totalImg === data.totalHits) {
        hideBtn();
        Notiflix.Notify.info(`You have got all avaiable images.`);
      } // якшо на сторінці відображені всі можливі картнки

      return refs.gallery.insertAdjacentHTML('beforeend', markup(data.hits));
    })
    .catch(err => {
      error(err);
    });
}

function hideBtn() {
  refs.moreBtn.hidden = true;
}

function showBtn() {
  refs.moreBtn.hidden = false;
}

function error(err) {
  console.log(err);
  throw new Error(
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    )
  );
}
