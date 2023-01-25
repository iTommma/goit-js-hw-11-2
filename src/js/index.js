// Для HTTP-запитів використана бібліотека axios.
// Використовується синтаксис async/await.

// Додай оформлення елементів інтерфейсу

// Пагінація
// Код відформатований за допомогою Prettier.

import '../css/styles.css';

// // Підключаю notiflix сповіщєння https://github.com/notiflix/Notiflix#readme
// npm i notiflix
import Notiflix from 'notiflix';
// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');

// // Знаходжу HTML елементи:
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let myQuery = '';
let myPage;

// // Ф. генеруэ HTML рзмітку галереї
import { createGallEryList } from './gallery-list';

// // API для пошуку зображень, публічний сервіс Pixabay
import { request } from './pixabay';

// обробляю відповідь бекенду
const requestFunction = async () => {
  try {
    const req = await request(myQuery, myPage);
    // console.log('req*', req);
    run(req);
  } catch (err) {
    console.log(err);
  }
};

// // логіка:
function run(response) {
  // масив який повертає бекенд
  const items = response.data.hits;
  const totalHits = response.data.totalHits;
  // console.log('response*', response);
  // console.log('req*', req);
  // console.log('ARR items', items);

  // Повідомлення: якщо бекенд повертає порожній масив
  if (items.length === 0) {
    console.log('Array length 0');

    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  // якщо бекенд повертає повний масив: створюю галерею
  gallery.insertAdjacentHTML('beforeend', createGallEryList(items));
  // і відображаю кнопку пагінації
  loadMoreButton.classList.remove('is-hidden');

  // Повідомлення: при першій видачі пошукового запросу показати загаьну кількість сторінок
  if ((myPage = 1)) {
    Notiflix.Notify.success(`Hooray! We found totalHits ${totalHits} images.`);
  }

  // Повідомлення: перевірити чи це не остання сторінка видачі, якщо остання показати повідомлення і приховати кнопку
  if (totalHits / 40 < myPage + 1) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    // * приховати кнопку пагынації
  loadMoreButton.classList.add('is-hidden');
  }
}

// // Ловлю подію в формі пошуку і відправляю пошуковий запрос на бекенд
searchForm.addEventListener('submit', e => {
  // прибираю оновлення сторінки при сабміті
  e.preventDefault();

  // виймаю пошуковий запрос з події
  myQuery = e.target.querySelector('input').value;
  myPage = 1;

  // видаляю галерею
  gallery.innerHTML = '';
  // відправляю пошуковий запрос на бекенд
  requestFunction();
});

// // Ловлю подію клік на кн. "load More" і відправляю запрос на бекенд
loadMoreButton.addEventListener('click', e => {
  myPage += 1;
  requestFunction();
});
