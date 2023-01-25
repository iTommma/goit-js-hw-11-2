'use strict';

// // встановлюю axios https://axios-http.com/uk/docs/intro
// $ npm install axios
// рефакторю >> const axios = require('axios').default; << в:
import axios from 'axios';

// https://pixabay.com/api/?key=32925042-7db54cf1dcb8f5ff60841ad32&q=yellow+flowers&image_type=photo
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32925042-7db54cf1dcb8f5ff60841ad32';

// Ф для запросу при ноому пошуку
export const request = (myQuery, myPage = 1) => {
  return axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: myQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: myPage,
      per_page: 40,
    },
  });
};
