import './sass/index.scss';
import Notiflix from 'notiflix';
import fetchcountries from './fetchfunctions.js';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryLInfo: document.querySelector('.country-info'),
};
refs.countryLInfo.classList.add('disable');
refs.inputField.addEventListener(
  'input',
  debounce(displayCountries, DEBOUNCE_DELAY)
);

function displayCountries(ev) {
  let searchQuery = ev.target.value;

  fetchcountries(searchQuery)
    .then(countryInfo => createMarkup(countryInfo))
    .catch(error => {
      if (searchQuery === '') {
        return;
      }
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });

  if (ev.target.value === '') {
    refs.countryLInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
  }
}

function createMarkup(information) {
  if (information.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  const html = information
    .map(element => {
      return `<li class='item'>
            <img src='${element.flag}' width='40' heigth='30' alt='flag image' />
            <p>${element.name}</p>
            
          </li>`;
    })
    .slice(0, 15)
    .join('');
  refs.countryLInfo.innerHTML = '';
  refs.countryList.innerHTML = html;
  refs.countryList.classList.remove('disable');
  refs.countryLInfo.classList.add('disable');

  if (information.length === 1) {
    const htmloneElement = information
      .map(element => {
        return `
        <div class ='flag_country'>
        <img src='${element.flag}' width='40' height="30"  alt='flag image' />
        <h2>${element.name}</h2>
        </div>
          <p><span>Capital: </span>${element.capital}</p>
          <p><span>Population: </span>${element.population}</p>
          <p><span>Language: </span>${element.languages[0].name}</p>
       `;
      })
      .slice('')
      .join('');
    refs.countryLInfo.classList.remove('disable');
    refs.countryList.classList.add('disable');
    refs.countryLInfo.innerHTML = htmloneElement;
    refs.countryList.innerHTML = '';
  }
}
