import Notiflix from 'notiflix';

export const fetchImg = async (value, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '32943531-cb871ea456f4d19bb7942720c';
  const PARAMS =
    'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
  const resp = await fetch(
    `${BASE_URL}?key=${KEY}&q=${value}&${PARAMS}&page=${page}`
  );
  if (!resp.ok) {
    throw new Error(Notiflix.Notify.failure('Sorry, again.'));
  }
  return await resp.json();
};
