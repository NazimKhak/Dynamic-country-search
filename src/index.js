import './css/styles.css';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryLInfo: document.querySelector('.country-info'),
};

refs.inputField.addEventListener(
  'input',
  debounce(displayCountries, DEBOUNCE_DELAY)
);

function displayCountries(ev) {
  fetchcountries(ev.target.value);
}

function createMarkup(information) {
  const html = information
    .map(element => {
      return `<li class='item'>
        <img src='${element.flag}' width='100' heigth='100' alt='flag image' />
        <p>${element.name}</p>
        <p>${element.capital}</p>
        <p>${element.languages[0].name}</p>
      </li>`;
    })
    .slice(0, 10)
    .join('');

  refs.countryList.innerHTML = html;
}

function fetchcountries(countryName) {
  fetch(
    `https://restcountries.com/v2/name/${countryName}?fields=name,flag,capital,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(countryInfo => {
      createMarkup(countryInfo);
    })
    .catch(error => {});
}
