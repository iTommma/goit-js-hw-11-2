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

let apiSearch = '';
let apiPage = 0;

// // Ф. генеруэ HTML рзмітку галереї
import { createGallEryList } from './gallery-list';

// // API для пошуку зображень, публічний сервіс Pixabay
import { requestApi } from './pixabay';


// // Обробляю відповідь бекенду
const runSearsh = async (apiSearch, page) => {
  try {
    const req = await requestApi(apiSearch, page);
    console.log('2 runSearsh page', page);

    runAction(req);
  } catch (err) {
    console.log(err);
    Notiflix.Notify.failure(
      'Sorry, ' + err
    );
  }
};

// // логіка:
function runAction(response) {
  // // масив елементів який повертає бекенд
  const items = response.data.hits;
  // // всього елементів
  const totalHits = response.data.totalHits;
  // console.log('response*', response);

  // Повідомлення: якщо бекенд повертає []
  if (items.length === 0) {
    console.log('Array length 0');

    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  // якщо бекенд повертає масив елементів створюю галерею
  gallery.insertAdjacentHTML('beforeend', createGallEryList(items));
  // і відображаю кнопку пагінації
  loadMoreButton.classList.remove('is-hidden');

  // Повідомлення: при першій видачі пошукового запросу показати загаьну кількість сторінок
  if ( apiPage === 1) {
    Notiflix.Notify.success(`Hooray! We found totalHits ${totalHits} images.`);
  }

  // Повідомлення: перевірити чи це не остання сторінка видачі, якщо остання показати повідомлення і приховати кнопку
  if (totalHits / 40 < apiPage + 1) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    // * приховати кнопку пагінації
  loadMoreButton.classList.add('is-hidden');
  }
}


// // Ловлю подію в формі пошуку і відправляю пошуковий запрос на бекенд
searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  // прибираю оновлення сторінки при сабміті
  e.preventDefault();

  // виймаю пошуковий запрос з події
  apiSearch = searchForm.children.searchQuery.value.trim();
  if (apiSearch.length < 1) {
    Notiflix.Notify.failure(
      'Please enter a keyword.'
    );
    return
  }
  apiPage = 1;

  // видаляю галерею
  gallery.innerHTML = '';

  // відправляю пошуковий запрос на бекенд
  runSearsh(apiSearch, apiPage);
  
  // // очищюю форму
  e.currentTarget.reset();
};

// // Ловлю подію клік на кн. "load More" і відправляю запрос на бекенд
loadMoreButton.addEventListener('click', e => {
  apiPage += 1;
  runSearsh(apiSearch, apiPage);
});
