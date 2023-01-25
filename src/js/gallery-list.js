'use strict';

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.
// request('yellow flowers')

export const createGallEryList = items => {
  return items
    .map(el => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = el;

      // loading="lazy" - відкладене завантаження;
      return `
        <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
            <p class="info-item">
                <b class="info-titl">Likes</b>
                ${likes}
            </p>
            <p class="info-item">
                <b class="info-titl">Views</b>
                ${views}
            </p>
            <p class="info-item">
                <b class="info-titl">Comments</b>
                ${comments}
            </p>
            <p class="info-item">
                <b class="info-titl">Downloads</b>
                ${downloads}
            </p>
            </div>
        </div>
        `;
    })
    .join('');
};
