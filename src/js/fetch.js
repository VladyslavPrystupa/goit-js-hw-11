import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32943531-cb871ea456f4d19bb7942720c';

export const fetchImg = async (value, page) => {
  const resp = await axios.get(BASE_URL, {
    params: {
      key: KEY,
      q: `${value}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: `${page}`,
    },
  });

  return resp.data;
};

// export const fetchImg = async (value, page) => {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const KEY = '32943531-cb871ea456f4d19bb7942720c';
//   const PARAMS =
//     'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
//   const resp = await fetch(
//     `${BASE_URL}?key=${KEY}&q=${value}&${PARAMS}&page=${page}`
//   );
//   if (!resp.ok) {
//     throw new Error(
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       )
//     );
//   }

//   return await resp.json();
// };
